
//----------------- Abrir e fechar Menu

  document.getElementById("hamburguer-icon").onclick = function(){
      document.getElementById("sliding-header-menu-outer").style.right = '0';
  };

  document.getElementById("sliding-header-menu-close-button").onclick = function(){
    document.getElementById("sliding-header-menu-outer").style.right = "-320px";
};


//---------------- Sobre nós  
//conteúdo do Sobre nós
var aboutUs = {
  "Missão": "Fazer com que cada cliente seja reconhecido como autoridade em seu segmento de atuação. Agregar valor ao negócio, potencializar o crescimento das operações e promover e estreitar o relacionamento do cliente com o seu público alvo, por meio da geração de conteúdo de relevância.",
  "Visão": "Ser reconhecida pelos clientes e pelo mercado como uma empresa parceira, inovadora e criativa, que oferece sempre os melhores produtos e soluções em Comunicação Empresarial Integrada.",
  "Valores": "<ul><li>Comprometimento</li><li>Inovação</li><li>Ética profissional</li><li>Superação dos resultados</li><li>Melhoria contínua</li></ul>"
};

var unselected_color = "#646872"; // cor da parte que não está selecionada
var selected_color = "#2A2D34"; // cor da parte que está selecionada

var about_tags = document.getElementsByClassName("single-tab");

for( var a = 0; a < about_tags.length; a++){

    about_tags[a].onclick = function(){ 
      
      for( var b = 0; b < about_tags.length; b++){
        about_tags[b].style['background-color'] = unselected_color; //alterando a cor - não selecionado
        about_tags[b].style['font-weight'] = 'normal';
  
}
      this.style['background-color'] = selected_color;  //alterando a cor -selecionado
      this.style['font-weight'] = 'bold';                 //alterando a fonte 

      var selecionado = this.innerHTML;

      document.getElementById(("box-text")).innerHTML = aboutUs[selecionado];

    };
}

//-----------Tela de  serviços

//variavel nossos serviços
var our_services = [
//índice 0
  {
    'title': 'Webdesign',
    'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent finibus tincidunt sem non sodales. Nunc et quam in magna vehicula sollicitudin. Aliquam erat volutpat. Maecenas dolor mi, aliquet ac quam aliquet, condimentum dictum nisi.'
  },
//índice 1
  {
    'title': 'Branding',
    'text': 'Praesent finibus tincidunt sem non sodales. Nunc et quam in magna vehicula sollicitudin. Aliquam erat volutpat. Maecenas dolor mi, aliquet ac quam aliquet, condimentum dictum nisi.'
  },
//índice 2
  {
    'title': 'Marketing Digital',
    'text': 'Nunc et quam in magna vehicula sollicitudin. Aliquam erat volutpat. Maecenas dolor mi, aliquet ac quam aliquet, condimentum dictum nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent finibus.'
  }
];

var servico_atual = 0;

//primeiro a setinha voltando (<), então, saindo do índice 0 e indo pro 2:
document.getElementById("service-previous").onclick = function(){
// se eu tiver no índice 0:
    if (servico_atual == 0){
      var servico_anterior = our_services.length - 1;  // sempre vou chegar no ultimo elemento, nao importa quantos sejam.
    } else { // se eu tiver em outro indice, sem ser 0
      var servico_anterior = servico_atual -1;
    }

//colocando as informações dentro de cada elemento:
             // 1 - título
    document.getElementById('service-title').innerHTML = our_services[servico_anterior].title;
    document.getElementById('service-text').innerHTML = our_services[servico_anterior].text;

//se eu estava no índice 0, servico atual vai passar a valer 2:
    servico_atual = servico_anterior
};

//segundo a setinha pra frente (>)
document.getElementById("service-next").onclick = function(){
      if (servico_atual == our_services.length - 1){
        var servico_seguinte = 0;
      } else { 
        var servico_seguinte = servico_atual + 1;
      }

      document.getElementById('service-title').innerHTML = our_services[servico_seguinte].title;
      document.getElementById('service-text').innerHTML = our_services[servico_seguinte].text;
  
      servico_atual = servico_seguinte;
};

//---------------formulário de contato (validação) 

// //const é var
// const username = document.getElementById("username");
// const email = document.getElementById("email");

// form.addEventListener('submit', (e) => { //adicionando o evento de enviar no formulário
//   e.preventDefault()  //cancela os elementos que vem com padrão na pagina

//   checkInputs() //função que vai ser executada quando o evento de enviar acontecer
// });

// function checkInputs(){
//   const usernameValue = username.value.trim();  //função (trim) para remover todos os espaços em brancos
//   const emailValue = email.value.trim();

//   if(usernameValue === ''){ //se username estiver vazio
//     errorValidation(username, 'Preencha esse campo');
//   } else {

//   }
// }

// function errorValidation(input, message){  
//   const formControl = input.parentElement; //input que tá por parametro; parentElement retorna uma referencia direta do pai
//   const small = formControl.querySelector('small');

//   small.innerText = message;

//   formControl.className = 'form-control error'
// }


//----------------------Data do Footer  (atualizar automatico toda vez que mudar de ano)

//se por no console, aparece a data atual.
var ano_atual = new Date; //criação de um novo objeto dessa classe (date)
ano_atual = ano_atual.getFullYear();

//vai por o ano atual dentro do elemento:
document.getElementById("current_year").innerHTML = ano_atual; 

  
   


   