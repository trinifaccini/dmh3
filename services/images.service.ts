export const fetchImages = async () => {

    const body = {
        collection:"images",
        database:"grupo3",
        dataSource:"Grupo3"
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                   'api-key': 'YRa7jxXnVCSPVvIPagfS5nDMxe0wzde4UeByIX68lUSs4qTsOed7tg4qK2w3UN6Q',
                   'Accept': 'application/json',
                    'Access-Control-Request-Headers': '*'},
        body: JSON.stringify(body)
    }

    const url = 'https://data.mongodb-api.com/app/data-zzjkv/endpoint/data/v1/action/find'
    const response = await fetch(url, requestOptions);

    return await response.json();
}

