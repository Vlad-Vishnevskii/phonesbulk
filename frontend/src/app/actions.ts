"use server";

import { cookies } from "next/headers";

import { ProductData } from "@/types/product";

export async function fetchProducts(
  query: string | undefined,
  sort = "",
  page = 1,
  filter = "",
  best = "",
  category = "",
) {
  const perPage = 18;

  let url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/products?`;

    // Filter by model name
    url += `filters[model][$containsi]=${query || ""}`;

    // Filter by brand (from 'filter' param)
    if (filter) {
      url += `&filters[brand][$containsi]=${filter}`;
    }

    // Filter by category
    if (category) {
      url += `&filters[category][$eq]=${category}`;
    }

    // Filter by bestprice or bestseller
    if (best.length > 0) {
      url += `&filters[${best}][$eq]=true`;
    }

    // Sorting
    if (sort) {
      url += `&sort=${sort}`;
    }

    // Pagination
    url += `&pagination[pageSize]=${perPage}&pagination[page]=${page}`;

  try {
    const response = await fetch(url, {
      cache: 'no-store',  // Отключение кэширования
    });
    const data = await response.json();
    return data.data as ProductData[];
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
}
//send Telegram
export async function sendTelegram(data?: any, token?: string, message?: any) {
  const botToken = process.env.NEXT_TELEGRAM_TOKEN; // Токен вашего бота
  const chatId = "189560661"; //  230076187 Замените на ваш Telegram ID

  async function sendMessage(text: string) {
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "HTML",
      }),
    }).catch(err => console.error(err));
  }

  if (data && token) {
    const id = data.data.id;
    const {
      name,
      surname,
      country,
      company,
      designation,
      phone,
      email,
      whatsap,
      address1,
      address2,
    } = data.data.attributes;

    //NEXT_STRAPI_TOKEN_USER

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/orders/${id}?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const dataOrder = await response.json();
    const attributes = dataOrder.data.attributes;
    const products = attributes.products;
    const allSumm = attributes.summation;

    const text = `
  <b>New order № ${id}</b>

  <i>Customer ${name} ${surname}</i>

  <b>Company:</b>  ${company}
  <b>Designation:</b>  ${designation}

  <b>Email:</b>  ${email}
  <b>Phone:</b>  ${phone}
  <b>Whatsap:</b>  ${whatsap}

  <b>Country:</b> ${country}
  <b>Shipping address 1:</b>  ${address1}
  <b>Shipping address 2:</b>  ${address2}

  <u>Order list:</u>

  ${products.map((product: any) => `${product.model} <b>x ${product.quantity}</b>`)}

  <i>Order price</i> <b>$${allSumm?.toLocaleString("en-US")}</b>

  `;
    sendMessage(text);
  }

  if (message) {
    const { name, email, phone, messText } = message;

    const text = `
  <b>New question</b>

  <i>Customer ${name}</i>
  <b>Email:</b>  ${email}
  <b>Phone:</b>  ${phone}

  <b>Question:</b>  ${messText}
  `;

    sendMessage(text);
  }
}

//Create products
export async function createProducts(data: any) {
  const cookiesStrore = cookies();
  const token = cookiesStrore.get("token");
  const sendedData = { ...data };
  sendedData.price = +data.price;
  sendedData.qty = +data.qty;
  sendedData.bestprice = data.bestprice === "" ? false : true;
  sendedData.bestseller = data.bestseller === "" ? false : true;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/products`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token?.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: sendedData }),
      },
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
//Delete One entity
async function deleteOneProduct(id: number) {
  const cookiesStrore = cookies();
  const token = cookiesStrore.get("token");
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/products/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
async function unicBrands(data: Object[]) {
  const cookiesStrore = cookies();
  const token = cookiesStrore.get("token");
  const uniqueBrands = data
    .map((item: any) => item.attributes.brand) // Преобразуем массив объектов в массив строк (брендов)
    .filter((brand, index, array) => array.indexOf(brand) === index);

  const sendData = {
    data: {
      filteroption: uniqueBrands.map(brand => {
        return {
          value: `manufac:${brand.toLowerCase()}`,
          label: `${brand.charAt(0).toUpperCase()}${brand.slice(1)}`,
        };
      }),
    },
  };
  sendData.data.filteroption.unshift({
    value: "all",
    label: "Manufactures All",
  });

  await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/filteroptions/1`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token?.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendData),
  });
}
//Delete allProducts
export async function deleteAllProducts() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/products?pagination[pageSize]=100`,
  );
  const data = await response.json();
  const products = data.data;
  const allcount = data.meta.pagination.total;
  const pageCount = data.meta.pagination.pageCount;

  if (products.length === 0) return;
  if (allcount < 100) {
    const ids = products.map((product: any) => product.id);
    await unicBrands(products);

    const promises = ids.map((id: number) => deleteOneProduct(id));
    return await Promise.all(promises);
  } else {
    let newProducts = [...products];

    for (let page = 0; page < pageCount; page++) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/products?pagination[page]=${page + 1}&pagination[pageSize]=100`,
      );

      if (response.ok) {
        const data = await response.json();

        newProducts = [...newProducts, ...data.data]; // Добавляем полученные продукты в массив
      } else {
        // Обработка ошибок HTTP
        console.error("Failed to fetch products:", response.statusText);
      }
    }
    const idsNewProducts = newProducts.map((product: any) => product.id);
    await unicBrands(newProducts);
    const promises = idsNewProducts.map((id: number) => deleteOneProduct(id));
    return await Promise.all(promises);
  }
}

//Fetch count options
export async function getFilterOptions() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/filteroptions/?populate=*`,
  );
  const data = await response.json();
  const filterOptions = data.data[0].attributes;
  return filterOptions.filteroption;
}

//Get users mails
export async function getUsersMail() {
  const cookiesStrore = cookies();
  const token = cookiesStrore.get("token");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/users?filters[mailing][$eq]=true&fields[0]=email`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "application/json",
      },
    },
  );
  const emails = await response.json();
  return emails;
}

//Sendmail from https://api.smtp.bz

export async function sendMail(message: string, subject: string, file?: any) {
  const base_url = "https://api.smtp.bz/v1";
  const api_key = "P1efjQqF8Rl6LuiafHINBoyaHsd0gHyVyD1I";
  const emails = await getUsersMail();

  for (let i = 0; i < emails.length; i++) {
    const response = await fetch(`${base_url}/smtp/send`, {
      method: "POST",
      headers: {
        Authorization: `${api_key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "noreply@phonesbulk.com",
        subject: subject,
        to: emails[i].email,
        html: `<html><head></head><body>${message}</body></html>`,
        files: [file],
      }),
    });
  }

  return { status: "true" };
}

export async function getMailTemplate() {
  const cookiesStrore = cookies();
  const token = cookiesStrore.get("token");
  const reponse = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/sendmail`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "application/json",
      },
    },
  );

  const data = await reponse.json();
  const template = data.data.attributes.sendmail;
  return template;
}

//Get Meta
export async function getMeta(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/metainfo?populate=*`,
  );
  const data = await response.json();
  const meta = data.data.attributes.metatags;
  return meta[id];
}
