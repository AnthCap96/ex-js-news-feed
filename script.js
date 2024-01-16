//ARRAY
const articles = [
    {
      title: "Scoperta di una nuova specie di papera di gomma",
      author: "Diana Rossi",
      date: "2023/02/11",
      description:
        "Un breve articolo sulla recente scoperta di una specie di papera di gomma mai vista prima.",
      image: "rubber-duck.jpg",
      type: ["geo","tech"],
    },
    {
      title: "Esplorando le profondità marine: il mistero degli abissi",
      author: "Fabio Mari",
      date: "2023/03/14",
      description:
        "Un viaggio nelle profondità dell'oceano alla scoperta di creature misteriose e inesplorate.",
      image: "deep-sea.jpg",
      type: ["travel" , "geo" ],
    },
    {
      title: "Viaggio culinario: alla ricerca dei sapori perduti",
      author: "Marco Bianchi",
      date: "2023/04/20",
      description:
        "Esplorazione di tradizioni culinarie dimenticate e la ricerca di sapori autentici.",
      image: "kitchen-food.jpg",
      type: ["cooking"],
    },   
    {
      title: "Arte moderna: oltre i confini convenzionali",
      author: "Gabriele Neri",
      date: "2023/05/29",
      description:
        "Un'analisi delle tendenze e delle sfide nell'arte contemporanea, con interviste a artisti emergenti.",
      image: "modern-art.jpg",
      type: ["art" , "tech"],
    },
  ];
  
 //FUNCION TYPE SELECTION
  let saved_articles = [];
  
  function ciclo() {
    const type = document.getElementById("selected").value;
    const checkbox = document.getElementById("check_saved_articles")
    let local_articles = articles;

    if (checkbox.checked) {
    if (type) {
      const saved_type = saved_articles.filter((sav_art) =>
      sav_art.type.includes(type)
      );
      display_articles(saved_type);
  } else {
    display_articles(saved_articles);
  } return;
  }

    if (type) {
  local_articles = local_articles.filter((article) =>
    article.type.includes(type)
  );
  }

  display_articles(local_articles);
}
//FUNCION CHECKBOX
addEventListener("change", keep_checkbox);

function keep_checkbox() {
  const checkbox = document.getElementById("check_saved_articles");
  ciclo();
}


//FUNCION COLORED TYPE
  function display_articles(articles) {
    const card_articles = articles
      .map((article) => {
        const button_class = article.type.map((type) => get_button_class(type));
        const btn = button_class.map ((button_class, i) => {
          return `<a class="btn btn-disabled ${button_class}">${article.type[i]}</a>`;
      })
      .join(" ");

      //DATE FROM US TO ITA
      const local_date = it_date(article.date)

      function it_date(it_string) {
        const date = new Date(it_string);
        return date.toLocaleDateString("it-IT");
      }
      

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
                                    article.tite
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
                      <p class="card-title">in data ${local_date}</p>
  
                      <p class="card-text">${article.description}</p>
                      <img src="./img/${
                        article.image
                      }" class="card-img-top mb-3 rounded" alt="${article.image}">
                      ${btn}
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
  
    return type_class_map[type];
  }
  
  function save_the_article(news) {
    const i = saved_articles.findIndex(
      (sav_art) => sav_art.title === news
    );
  
    if (i === -1) {
      const article_to_save = articles.find((article) => article.news === news);
      saved_articles.push(article_to_save);
    } else {
      saved_articles.splice(i, 1);
    }
  
    ciclo();
  }

  ciclo();
 
