
// Objeto para pegar os preços e as fotos das camisetas

var camisetas = {
    'branca': {
        
        'gola_v': {
            'sem_estampa': {
                'preco_unit': 5.12,
                'foto': 'v-white.jpg' 
            },
            'com_estampa': {
                'preco_unit': 8.95,
                'foto': 'v-white-personalized.jpg' 
            }
        },
        
        'gola_normal': {
            'sem_estampa': {
                'preco_unit': 4.99,
                'foto': 'normal-white.jpg' 
            },
            'com_estampa': {
                'preco_unit': 8.77,
                'foto': 'normal-white-personalized.jpg' 
            }
        }
    },
    
    'colorida': {
        'gola_v': {
            'sem_estampa': {
                'preco_unit': 6.04,
                'foto': 'v-color.jpg' 
            },
            'com_estampa': {
                'preco_unit': 9.47,
                'foto': 'v-color-personalized.png' 
            }
        },
        
        'gola_normal': {
            'sem_estampa': {
                'preco_unit': 5.35,
                'foto': 'normal-color.jpg' 
            },
            'com_estampa': {
                'preco_unit': 9.28,
                'foto': 'normal-color-personalized.jpg' 
            }
        }
    }
}


// parâmetros da pesquisa

var parametros_pesquisa = {
    "quantidade": 100,
    "cor": "colorida",
    "gola": "gola_v",
    "qualidade": "q150",
    "estampa": "sem_estampa",
    "embalagem": "unitaria"
}

// Passos
// 1. Verificar se há em localStorage os parâmetros do último orçamento e se houver, carregar a página com eles.
// 2. A camisa de qualidade alta (190g/m2) deve acrescer o preço unitário em 12%.
// 3. A embalagem unitária tem um custo de 0.15 por unidade
// 4. Após cálculo do preço, há que se aplicar um desconto por quantidade, sendo: 
    // faixa 1: acima de 1.000 - Desconto de 15%
    // faixa 2: acima de 500 - Desconto de 10%
    // faixa 3: acima de 100 - Desconto de 5%

// Resolução do desafio:

$(function(){ //evento ready. p carregar a pagina e executar tudo certinho

  function atualizar_orcamento(parametros){ //parametros é oq ta dentro da var parametros_pesquisa ali de cima
    
    $(".refresh-loader").show();

    var quantidade = parametros.quantidade; //p pegar a quantidade
    var preco_unit = camisetas[parametros.cor][parametros.gola][parametros.estampa].preco_unit; // p pegar o preço
    var foto = 'img/' + camisetas[parametros.cor][parametros.gola][parametros.estampa].foto; // p pegar a foto

    var valor_total = quantidade * preco_unit;
     
    if (parametros.qualidade == "q190"){ // p ver a qualidade da camisa (passo 2)
        valor_total *= 1.12;  //ele * ele mesmo mais 1.12
    };
    if (parametros.embalagem == "unitaria"){ // p ver a embalagem (0.15 a mais por unidade) (passo 3)
        valor_total += (quantidade * 0.15); //ele mais ele mesmo, mais o valor da camisa em si e o 15cents
    };

    if (quantidade >=1000){ //p ver os descontos (passo 4)
        valor_total *= 0.85; // desconto de 15%
    }else if (quantidade >=500){   // não precisa por que é menor que mil, pq se não ele ja para no primeiro if
        valor_total *= 0.90; //desconto de 10%
    }else if (quantidade >=100){
        valor_total *= 0.95; // desconto de 5%
    };

    window.setTimeout(function(){
            // gola
        var id_gola = '#' + parametros.gola;
        $("#result_gola").html($(id_gola).html());

            //estampa
        var id_estampa = "option[value='" + parametros.estampa + "']" //serve p no html aparecer bonitinho 
        $("#result_estampa").html($(id_estampa).html());

            //qualidade
        var id_qualidade = '#' + parametros.qualidade;
        $("#result_qualidade").html($(id_qualidade).html());

            //cor
        var id_cor = '#' + parametros.cor;
        $("#result_cor").html($(id_cor).html());

            //embalagem
        var id_embalagem = "option[value='" + parametros.embalagem + "']"
        $("#result_embalagem").html($(id_embalagem).html());

            //quantidade
        $("#result_quantidade").html(parametros.quantidade);

        $("#valor-total").html(valor_total.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2 })); //pra formatar o valor e ficar certinho (1.200,00 por ex)
        $("#foto-produto").attr("src", foto);

        $(".refresh-loader").hide();
    },1000);

  };


    function atualizar_campos(parametros){ //tem relação com o filtro do array dos parametros da linha 58
        //cor
        $("#cor").children().removeClass("selected");
        var id_cor = "#" + parametros.cor;
        $(id_cor).addClass("selected");

        //gola
        $("#gola").children().removeClass("selected");
        var id_gola = "#" + parametros.gola;
        $(id_gola).addClass("selected");

         //qualidade
         $("#qualidade").children().removeClass("selected");
         var id_qualidade = "#" + parametros.qualidade;
         $(id_qualidade).addClass("selected");

        //estampa
        $("#estampa").val(parametros.estampa);

        //embalagem
        $("#embalagem").val(parametros.embalagem);

        //quantidade
        $("#quantidade").val(parametros.quantidade);
    };

    function atualizar_localStorage(parametros){   //localStorage
        window.localStorage.setItem("quantidade", parametros.quantidade);
        window.localStorage.setItem("cor", parametros.cor);
        window.localStorage.setItem("gola", parametros.gola);
        window.localStorage.setItem("qualidade", parametros.qualidade);
        window.localStorage.setItem("estampa", parametros.estampa);
        window.localStorage.setItem("embalagem", parametros.embalagem);
    };


    $(".option-filter div").click(function(){ // p alterar a cor quando clicar em cima (quantidade...)
        $(this).parent().children("div").removeClass("selected"); //removendo a classe que dá a cor
        $(this).addClass("selected"); //adicionando a cor onde clicamos

        var categoria = $(this).parent().attr("id"); //categoria vai pegar o id da cor
        parametros_pesquisa[categoria] = $(this).attr("id"); 
        atualizar_localStorage(parametros_pesquisa);
        atualizar_orcamento(parametros_pesquisa);

    });

    $("select").change(function(){ //select do index (estampa, embalagem)
        var parametro_select = $(this).attr("id");
        parametros_pesquisa[parametro_select] = $(this).val(); 
        atualizar_localStorage(parametros_pesquisa);
        atualizar_orcamento(parametros_pesquisa);
    });

    $('#quantidade').change(function(){  // p mexer na quantidade
        var parametro_input = $(this).attr("id"); //input
        parametros_pesquisa[parametro_input] = $(this).val(); 
        atualizar_localStorage(parametros_pesquisa);
        atualizar_orcamento(parametros_pesquisa);
    });


    //ao carregar a página

    //quantidade
    if(window.localStorage["quantidade"]){ //verificando se existe um localstorage com a chave quantidade
        parametros_pesquisa.quantidade = parseInt(window.localStorage["quantidade"]); //se existir, atualiza com o valor que tá no localstorage
    };
    //cor
    if(window.localStorage["cor"]){ 
        parametros_pesquisa.cor = window.localStorage["cor"]; 
    };
    //qualidade
    if(window.localStorage["qualidade"]){ 
        parametros_pesquisa.qualidade = window.localStorage["qualidade"]; 
    };
    //gola
    if(window.localStorage["gola"]){ 
        parametros_pesquisa.gola = window.localStorage["gola"];
    };
    //estampa
    if(window.localStorage["estampa"]){ 
        parametros_pesquisa.estampa = window.localStorage["estampa"]; 
    };
    //embalagem
    if(window.localStorage["embalagem"]){ 
        parametros_pesquisa.embalagem = window.localStorage["embalagem"]; 
    };
    



    // verificar localstorage e atualizar a variável parametros_pesquisa
    atualizar_localStorage(parametros_pesquisa);
    atualizar_campos(parametros_pesquisa);
    atualizar_orcamento(parametros_pesquisa);
});
















