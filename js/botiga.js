let urlP = "https://qandf-bd.herokuapp.com/productes";
let prods;
let carro=0;

const card = (p) => {
    $("#productes").append(`
        <div class="card ${p.tipus}" style="width: 14rem;">
            <img src="../img/botiga/${p.foto}" class="card-img-top" alt="Imatge de ${p.nom}">
            <div class="card-body">
                <h5 class="card-title"><b>${p.nom}</b></h5>
                <h6 class="card-price">Preu: <b>${p.preu}</b></h6>
                <form class="contador" id="p${p.id}">
                    <button class="resta btn-count"><i class="fas fa-minus-circle quantitat"></i></button>
                    <input class="num" type="number" value="0">
                    <button class="suma btn-count"><i class="fas fa-plus-circle quantitat "></i></button>
                </form>
            </div>
        </div>
    `);
}

const entrants = () => {
    $(".titol-tipus").hide();
    $(".card").hide();
    $("#titol-entrants").show();
    $(".entrant").show();
}

const plats = () => {
    $(".titol-tipus").hide();
    $(".card").hide();
    $("#titol-plats").show();
    $(".plat").show();
}

const postres = () => {
    $(".titol-tipus").hide();
    $(".card").hide();
    $("#titol-postres").show();
    $(".postre").show();
}

const tots = () => {
    $(".titol-tipus").hide();
    $("#titol-tots").show();
    $(".card").show();
}

const ini = () => {
    document.getElementById("productes").innerHTML = "";
    $("#productes").prepend(`
        <h4 id="titol-tots" class="titol-tipus"><b>TOTS ELS PRODUCTES</b></h4>
        <h4 id="titol-entrants" class="titol-tipus"><b>ENTRANTS</b></h4>
        <h4 id="titol-plats" class="titol-tipus"><b>PLATS</b></h4>
        <h4 id="titol-postres" class="titol-tipus"><b>POSTRES</b></h4>
    `);
    $("#titol-entrants").hide();
    $("#titol-plats").hide();
    $("#titol-postres").hide();

    prods.forEach(p => {
        card(p);
    });
}

const suma = (id) => {
    let num = $(`#${id}`).children(".num")
    let val = num.val();
    val = parseInt(val);
    val += 1;
    num.val(val);
    ++carro;
    $("#carro-num").html(`<b>${carro}</b>`);
}

const resta = (id) => {
    let num = $(`#${id}`).children(".num")
    let val = num.val();
    val = parseInt(val);
    if(val>0) val -= 1;
    num.val(val);
    --carro;
    $("#carro-num").html(`<b>${carro}</b>`);
}

$( window ).on("load", async () => {
    try {
        prods =  ( await axios.get(`${urlP}`) ).data;
        console.log(prods);
    } catch (error) {
        console.log(err)
    }
    ini();
    $("#entrants").on("click", entrants);
    $("#plats").on("click", plats);
    $("#postres").on("click", postres);
    $("#tots").on("click", tots);
    $(".suma").on("click", function (event) {
        let id = $(this).parent().attr("id");
        suma(id);
        return false;
    });
    $(".resta").on("click", function (event) {
        let id = $(this).parent().attr("id");
        resta(id);
        return false;
    });
})