$(function($){

    let listaContatos = recuperaListaContatos();

    if(!isEmpty(listaContatos)){
        for(let i=0 ; i<listaContatos.length; i++){
            appendLine(listaContatos[i].nome,listaContatos[i].telefone,listaContatos[i].cidade,listaContatos[i].estado,listaContatos[i].email,listaContatos[i].informacoes,listaContatos[i].categoria);
        }
    }
});


function addContato(){
    

    let listaContatos = recuperaListaContatos();
    
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
        localStorage.setItem("formulario",JSON.stringify(data));
        appendLine(formInfo.nome,formInfo.telefone,formInfo.cidade,formInfo.estado,formInfo.email,formInfo.informacoes,formInfo.categoria);
    }
    else
        alert("Contato Existente.")
        
};    


function appendLine(nome, telefone, cidade, estado, email, informacoes, categoria){

    $("#contatos").append("<tr>"+
                          "<td>"+nome+"</td>"+
                          "<td>"+telefone+"</td>"+
                          "<td>"+cidade+"</td>"+
                          "<td>"+estado+"</td>"+
                          "<td>"+email+"</td>"+
                          "<td>"+informacoes+"</td>"+
                          "<td>"+categoria+"</td>"+
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
    
    let formInfo = recuperaListaContatos();

    if(!isEmpty(formInfo)){
        for(let i=0 ; i<formInfo.length; i++){
            if(formInfo[i].nome==nome)
                return true;
        }
    }
    
    return false;    

}


function recuperaListaContatos(){
    return JSON.parse(localStorage.getItem("formulario"));
}

function idNovoContato(data){
    
    return data.length>0?data[data.length-1].id+1:0;

}