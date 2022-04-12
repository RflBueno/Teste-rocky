
const data = require('./broken-database.json');

//Função para Ordenar valores
function ordenarValores(item) {
    //Ordenar os Id's
    const ordenarId = item.sort((a, b) => {
        if (a.id > b.id) {
            return 1;
        }
        if (a.id < b.id) {
            return -1;
        }
        return 0;
    });

    //Ordenar as category's
    const dataFinal = ordenarId.sort((a, b) => {
        if (a.category > b.category) {
            return 1;
        }
        if (a.category < b.category) {
            return -1;
        }
        return 0;
    });
    //console.log(dataFinal);
    return dataFinal;
}



function organizaBanco(item) {
    //Organiza as letras do name
    for (i = 0; i < item.length; i++) {
        item[i].name = item[i].name.replace((/æ/g), 'a');
        item[i].name = item[i].name.replace((/¢/g), 'c');
        item[i].name = item[i].name.replace((/ß/g), 'b');
        item[i].name = item[i].name.replace((/ø/g), 'o');

        //Identifica e reorganiza os quantity's
        if (!item[i].hasOwnProperty("quantity")) {
            item[i].quantity = 0;
        }

        //Identifica e troca os price de String para Float  
        if (typeof item[i].price === 'string') {
            item[i].price = parseFloat(item[i].price);
        }
        console.log("ID: " + item[i].id + "\nNome: " + item[i].name + "\n" + "Categoria: " + item[i].category + "\n");
    }
    return item;
}

//Função para a Soma das categorias
function somarProdutos(value) {
    for (i in value) {
        if (value[i].category == "Acessorios") {
            var somaAcessorio = value[i].price * value[i].quantity;
        }
        if (value[i].category == "Eletronicos") {
            var somaEletronico = value[i].price * value[i].quantity;

            if (value[i].category == "Moveis") {
                var somaMoveis = value[i].price * value[i].quantity;
            }
        }
        console.log(
            "| Categorias ---------- R$Total\n\n" +
            "| Acessorios: --------- R$" + somaAcessorio + "\n" +
            "| Eletronicos: -------- R$" + somaEletronico + "\n" +
            "| Moveis: -------- R$" + somaMoveis + "\n" +
        );

    }

    //Chamar funções
    const novadata = ordenarValores(data);

    const finalData = organizaBanco(novadata);
    //Descomentar "console.log" para visualizar o JSON ordenado
    //console.log(finalData);

    somarProdutos(finalData)
};