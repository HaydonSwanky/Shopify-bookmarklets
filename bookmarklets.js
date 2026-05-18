(() => {
  const previewTheme = () => {
    /* preview theme */

    let url = new URL(location);
    let ls = location.pathname.split('/');
    url.host = window?.Shopify && Shopify.shop || (()=>{
        return ls[ls.findIndex((x)=> x == 'store') + 1] + ".myshopify.com";
        })();

    url.port = "";
    url.search = "";
    url.pathname = (() => {
        let searchParams = new URLSearchParams(location.search);
        if (searchParams.get("previewPath")) { return searchParams.get("previewPath")?.split("?")[0];
        }
        if (!location.origin.includes("admin")) { return location.pathname;
        }
        return "";
        })();

    url.searchParams.append("preview_theme_id", (() => {
          if (window?.Shopify?.theme) {
          return Shopify.theme.id;
          } else {
          return ls[ls.findIndex((x)=> x == 'themes') + 1];
          }
          })());

    console.log("Navigatingto", url.toString());
    location.href = url.toString();

  }


  const openCustomizer = () => {
    let url = new URL(`https://admin.shopify.com/store/${Shopify.shop.split(".")[0]}/themes/${Shopify.theme.id}/editor`);
    if (location.pathname !== "/") {
      url.searchParams.append("previewPath", encodeURI(window.location.pathname + window.location.search));
    }
    console.log("Navigatingto", url.toString());
    location.href=url;
  }


  const openAdmin = () => {
    let url = new URL(Shopify?.shop ? `https://admin.shopify.com/store/${Shopify.shop.split(".")[0]}` : location.origin+"/admin");
    console.log("Navigatingto", url.toString());
    location.href=url;
  }

  return {
    previewTheme,
    openCustomizer,
    openAdmin
  }
})();
