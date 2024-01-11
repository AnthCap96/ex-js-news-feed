//ARRAY
const articles = [
    {
      title: "Scoperta di una nuova specie di papera di gomma",
      author: "Diana Rossi",
      date: "11/02/2023",
      description:
        "Un breve articolo sulla recente scoperta di una specie di papera di gomma mai vista prima.",
      image: "rubber-duck.jpg",
      type: ["geo","tech"],
    },
    {
      title: "Esplorando le profondità marine: il mistero degli abissi",
      author: "Fabio Mari",
      date: "14/03/2023",
      description:
        "Un viaggio nelle profondità dell'oceano alla scoperta di creature misteriose e inesplorate.",
      image: "deep-sea.jpg",
      type: ["travel" , "geo" ],
    },
    {
      title: "Viaggio culinario: alla ricerca dei sapori perduti",
      author: "Marco Bianchi",
      date: "20/04/2023",
      description:
        "Esplorazione di tradizioni culinarie dimenticate e la ricerca di sapori autentici.",
      image: "kitchen-food.jpg",
      type: ["cooking"],
    },   
    {
      title: "Arte moderna: oltre i confini convenzionali",
      author: "Gabriele Neri",
      date: "29/05/2023",
      description:
        "Un'analisi delle tendenze e delle sfide nell'arte contemporanea, con interviste a artisti emergenti.",
      image: "modern-art.jpg",
      type: ["art" , "tech"],
    },
  ];
  
 //FUNCIONS
  let saved_articles = [];
  
  function ciclo() {
    const type = document.getElementById("selected").value;
    let local_articles = articles;
  
    if (type) {
      local_articles = local_articles.filter((article) =>
        article.type.includes(type)
      );
    }
  
    display_articles(local_articles);
  }
 
//CARDS
  function display_articles(articles) {
    const card_articles = articles
      .map((article) => {
        const button_class = get_button_class(article.type[0]);
  
        return `
              <div class="card mb-4 p-4" style="width: 100%;">
                  <div class="card-body">
                      <div class="container">
                          <div class="row">
                              <div class="col-10" style="padding-left: 0px;">
                                  <h2 class="card-title">${article.title}</h2>
                              </div>
                              <div class="col-2 d-flex justify-content-end button-save">
                                  <button type="button" class="btn btn-save" onclick="save_the_article('${
                                    article.title
                                  }')">
                                      <i class="fa-2x ${
                                        saved_articles.some(
                                          (sav_art) =>
                                          sav_art.title === article.title
                                        )
                                          ? "fa-solid"
                                          : "fa-regular"
                                      } fa-bookmark"></i>
                                  </button>
                              </div>
                          </div>
                      </div>
  
                      <h5 class="card-title">pubblicato da ${article.author}</h5>
                      <p class="card-title">in data ${article.date}</p>
  
                      <p class="card-text">${article.description}</p>
                      <img src="./img/${
                        article.image
                      }" class="card-img-top mb-3 rounded" alt="${article.image}">
                      <a class="btn btn-disabled ${button_class}">${
          article.type[0]
        }</a>
                  </div>
              </div>`;
      })
      .join("");
  
    document.getElementById("card_articles").innerHTML = card_articles;
  }
  
  function get_button_class(type) {
    const type_class_map = {
      geo: "btn-green",
      tech: "btn-blue",
      cooking: "btn-purple",
      travel: "btn-orange",
      art: "btn-yellow",
    };
  
    return type_class_map[type] || "";
  }
  
  function save_the_article(titolo) {
    const index = saved_articles.findIndex(
      (sav_art) => sav_art.title === titolo
    );
  
    if (index === -1) {
      const article_to_save = articles.find((article) => article.title === titolo);
      saved_articles.push(article_to_save);
    } else {
      saved_articles.splice(index, 1);
    }
  
    ciclo();
  }
  
  function handle_checkbox_change() {
    const checkbox = document.getElementById("check_saved_articles");
  
    if (checkbox.checked) {
      display_articles(saved_articles);
    } else {
      ciclo();
    }
  }
  
  ciclo();