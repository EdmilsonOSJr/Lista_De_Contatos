const nomeChave = "formulario";

$(function($){

    let listaContatos = recuperaListaContatos(nomeChave);

    if(!isEmpty(listaContatos)){
        for(let i=0 ; i<listaContatos.length; i++){
            appendLine(listaContatos[i].id,listaContatos[i].nome,listaContatos[i].telefone,
                        listaContatos[i].cidade,listaContatos[i].estado,listaContatos[i].email,
                        listaContatos[i].informacoes,listaContatos[i].categoria);
        }
    }

    
    $('.clicado').click(function () {
        id = $(this).parents('tr').find('th').eq(0).text();
            
        removerContato(id, this);
    
    });

});

function removerContato(id, elemento){
    
    elemento.closest("tr").remove();

    let listaContatos = recuperaListaContatos(nomeChave), listaNova = [];

    for(let i=0 ; i<listaContatos.length; i++){
        if(id!=listaContatos[i].id)
            listaNova.push(listaContatos[i]);
    }

    gravarContatos(listaNova, nomeChave);

}

function addContato(){
    

    let listaContatos = recuperaListaContatos(nomeChave);
    
    let data = isEmpty(listaContatos)==true?[]:listaContatos;
    
    let id = idNovoContato(data);

    let formInfo = {"id" : id,
                    "nome" : document.getElementById("nome").value,
                    "telefone" : document.getElementById("telefone").value,
                    "cidade": document.getElementById("cidade").value,
                    "estado": document.getElementById("estado").value,
                    "email": document.getElementById("email").value,
                    "informacoes" : document.getElementById("informacoes").value,
                    "categoria": document.getElementById("categoria").value,
                    };

    
    if(!contatoExistente(formInfo.nome)){
        data.push(formInfo);
        gravarContatos(data, nomeChave);
        appendLine(id,formInfo.nome,formInfo.telefone,formInfo.cidade,formInfo.estado,formInfo.email,formInfo.informacoes,formInfo.categoria);
    }
    else
        alert("Contato Existente.")
        
};    


function appendLine(id, nome, telefone, cidade, estado, email, informacoes, categoria){
    console.log(id);
    $("#contatos").append("<tr>"+
                          "<th>"+id+"</th>"+
                          "<td>"+nome+"</td>"+
                          "<td>"+telefone+"</td>"+
                          "<td>"+cidade+"</td>"+
                          "<td>"+estado+"</td>"+
                          "<td>"+email+"</td>"+
                          "<td>"+informacoes+"</td>"+
                          "<td>"+categoria+"</td>"+
                          "<td><button type=\"button\" class=\"clicado\" id=\"remover\">"+
                          "Remover"+
                          "</button></td>"+
                          "</tr>");

}


function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}


function contatoExistente(nome){
    let formInfo = recuperaListaContatos(nomeChave);

    if(!isEmpty(formInfo)){
        for(let i=0 ; i<formInfo.length; i++){
            if(formInfo[i].nome==nome)
                return true;
        }
    }
    
    return false;    
}


function recuperaListaContatos(keyName){
    return JSON.parse(localStorage.getItem(keyName));
}

function gravarContatos(contatos, keyName){
    localStorage.setItem(keyName,JSON.stringify(contatos));
}

function idNovoContato(data){
    return data.length>0?data[data.length-1].id+1:0;
}