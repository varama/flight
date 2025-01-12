async function client(endpoint: string, { ...customConfig }: any = {}) {
  const config: any = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-key": "ed821cdeb9mshe5702900b1a78cep17bfa0jsn7de30cb78bbb",
      "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
    },
    ...customConfig,
  };

  return window.fetch(`${endpoint}`, config).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export { client };
