const marketUrl = "https://marketplace.visualstudio.com/items?itemName=";
const installUrl = "vscode://";
const selector = {
  name: ".ux-item-name",
  author: ".ux-item-publisher",
  installs: ".ux-item-rating",
};

const promises = extensions.map((ext) =>
  fetch(marketUrl + ext)
    .then((page) => page.text())
    .then((content) => {
      const dom = new DOMParser().parseFromString(content, "text/html");
      return {
        name: dom.querySelector(selector.name).textContent,
        author: dom.querySelector(selector.author).textContent,
        installs: dom.querySelector(selector.installs).textContent.replace(/[^\d,]/g, ""),
        marketUrl: marketUrl + ext,
        installUrl: installUrl + ext,
      };
    })
);

const getExtensions = () => Promise.all(promises);
