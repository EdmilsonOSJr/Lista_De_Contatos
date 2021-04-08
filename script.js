const NOME_CHAAVE = "formulario";

$(function($){

    let listaContatos = recuperaListaContatos(NOME_CHAAVE);

    if(!estaVazio(listaContatos)){
        for(let i=0 ; i<listaContatos.length; i++){
            addLinha(listaContatos[i].id,listaContatos[i].nome,listaContatos[i].telefone,
                        listaContatos[i].cidade,listaContatos[i].estado,listaContatos[i].email,
                        listaContatos[i].informacoes,listaContatos[i].categoria);
        }
    }

    
    $('.remover').click(function () {
        id = $(this).parents('tr').find('th').eq(0).text();
            
        removerContato(id, this);
    
    });


    $('.alterar').click(function () {
        id = $(this).parents('tr').find('th').eq(0).text();
            
        atualizarContato(id);
    
    });

});

function atualizarContato(id){

    let listaContatos = recuperaListaContatos(NOME_CHAAVE);
    let contato = recuperaContato(id, listaContatos);

    inserirNoForm(contato.nome, contato.telefone, contato.cidade, contato.estado,
                  contato.email, contato.categoria, contato.informacoes);

    $("#enviar").attr("data-operacao", id);
    
}


function addContato(){
    

    let operacao = $("#enviar").attr("data-operacao");
    
    let listaContatos = recuperaListaContatos(NOME_CHAAVE);
    let formInfo;
    
    if(operacao == "gravar"){
        
        let data = estaVazio(listaContatos)==true?[]:listaContatos;
        
        let id = idNovoContato(data);
        
        formInfo = construirContato( id,
        document.getElementById("nome").value,
        document.getElementById("telefone").value,
        document.getElementById("cidade").value,
        document.getElementById("estado").value,
        document.getElementById("email").value,
        document.getElementById("informacoes").value,
        document.getElementById("categoria").value,
        );    

        if(campoEmBranco(formInfo))
            alert("Campo em branco.");
        else{
            
            if(!contatoExistente(formInfo.nome)){
                data.push(formInfo);
                gravarContatos(data, NOME_CHAAVE);
                addLinha(id,formInfo.nome,formInfo.telefone,formInfo.cidade,formInfo.estado,formInfo.email,formInfo.informacoes,formInfo.categoria);
            }
            else
                alert("Contato Existente.")
        }
            
    }
    else{
        
        let contato = recuperaContato(operacao, listaContatos);
        let listaNova = [];

        formInfo = construirContato( operacao,
            document.getElementById("nome").value,
                                         document.getElementById("telefone").value,
                                         document.getElementById("cidade").value,
                                         document.getElementById("estado").value,
                                         document.getElementById("email").value,
                                         document.getElementById("informacoes").value,
                                         document.getElementById("categoria").value,
                                         );
                                         
                                         if(campoEmBranco(formInfo))
                                         alert("Campo em branco.");
                                         else{


            for(let i=0 ; i<listaContatos.length; i++){
                if(operacao==listaContatos[i].id)
                    listaNova.push(formInfo);
                else
                    listaNova.push(listaContatos[i]);
                
            }

            if(contatoExistente(formInfo.nome)){
                if(contato.nome !=  document.getElementById("nome").value)
                    alert("Contato Existente.");
                else
                    gravarContatos(listaNova, NOME_CHAAVE);

            }
            else
            gravarContatos(listaNova, NOME_CHAAVE);
    
        }

        
    }
        
};    


function addLinha(id, nome, telefone, cidade, estado, email, informacoes, categoria){
    $("#contatos").append("<tr>"+
                          "<th>"+id+"</th>"+
                          "<td>"+nome+"</td>"+
                          "<td>"+telefone+"</td>"+
                          "<td>"+cidade+"</td>"+
                          "<td>"+estado+"</td>"+
                          "<td>"+email+"</td>"+
                          "<td>"+informacoes+"</td>"+
                          "<td>"+categoria+"</td>"+
                          "<td><button type=\"button\" class=\"remover\">"+
                          "Remover"+
                          "</button></td>"+
                          "<td><button type=\"button\" class=\"alterar\">"+
                          "Alterar"+
                          "</button></td>"+
                          "</tr>");

}


function estaVazio(objeto) {
    for(let propriedade in objeto) {
        if(objeto.hasOwnProperty(propriedade))
            return false;
    }

    return true;
}

function construirContato(id, nome, telefone, cidade, estado, email, info, categoria){
    return {"id" : id,
            "nome" : nome,
            "telefone" : telefone,
            "cidade": cidade,
            "estado": estado,
            "email": email,
            "informacoes" : info,
            "categoria": categoria,
            };
}

function contatoExistente(nome){
    let listaContatos = recuperaListaContatos(NOME_CHAAVE);

    if(!estaVazio(listaContatos)){
        for(let i=0 ; i<listaContatos.length; i++){
            if(listaContatos[i].nome==nome)
                return true;
        }
    }
    
    return false;    
}


function recuperaContato(id, listaContatos){

    for(let i=0 ; i<listaContatos.length; i++){
        if(id==listaContatos[i].id)
            return listaContatos[i];
    }

}

function removerContato(id, elemento){
    
    elemento.closest("tr").remove();

    let listaContatos = recuperaListaContatos(NOME_CHAAVE), listaNova = [];

    for(let i=0 ; i<listaContatos.length; i++){
        if(id!=listaContatos[i].id)
            listaNova.push(listaContatos[i]);
    }

    gravarContatos(listaNova, NOME_CHAAVE);

}


function recuperaListaContatos(keyName){
    return JSON.parse(localStorage.getItem(keyName));
}

function gravarContatos(contatos, keyName){
    localStorage.setItem(keyName,JSON.stringify(contatos));
}

function idNovoContato(data){
    return data.length>0?parseInt(data[data.length-1].id)+1:0;
}

function inserirNoForm(nome, telefone, cidade, estado, email, categoria, info){
    document.getElementById("nome").value = nome;
    document.getElementById("telefone").value = telefone;
    document.getElementById("cidade").value = cidade;
    document.getElementById("estado").value = estado;
    document.getElementById("email").value = email;
    document.getElementById("categoria").value = categoria;
    document.getElementById("informacoes").value = info;
}

function limparForm(){

    let emBraco = "";

    inserirNoForm(emBraco,emBraco,emBraco,document.getElementById("estado")[0].value,emBraco,document.getElementById("categoria")[0].value,emBraco);

}

function campoEmBranco(formInfo){

    if(formInfo.nome=="" | formInfo.telefone=="" | formInfo.cidade=="" | formInfo.estado=="" | formInfo.email=="" | formInfo.informacoes==""){
        return true;
    }            
    
    return false;
}