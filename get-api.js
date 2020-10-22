// apparently, there is a public REST API for fetching extensions,
// but apparently, there are certain limitations for the requests,
// so I sticked with DOM fetching instead

const promises = extensions.map((ext) =>
  fetch(
    "https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery",
    {
      method: "POST",
      headers: {
        accept: "application/json;api-version=6.1-preview.1;excludeUrls=true",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        filters: [
          {
            criteria: [{ filterType: 7, value: ext }],
          },
        ],
      }),
    }
  )
    .then((data) => data.json())
    .then(({ results }) => {
      const [data] = results[0].extensions;
      return {
        name: data.displayName,
        author: data.publisher.displayName,
        marketUrl: "https://marketplace.visualstudio.com/items?itemName=" + ext,
        installUrl: "vscode://" + ext,
      };
    })
);

const getExtensions = () => Promise.all(promises);
