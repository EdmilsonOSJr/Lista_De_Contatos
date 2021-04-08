$(function($){

    let formInfo = recuperaListaContatos();

    if(!isEmpty(formInfo)){
        for(let i=0 ; i<formInfo.length; i++){
            appendLine(formInfo[i].nome,formInfo[i].telefone,formInfo[i].cidade,formInfo[i].estado,formInfo[i].email,formInfo[i].informacoes,formInfo[i].categoria);
        }
    }
});


function addContato(){
    
    let formInfo = {"nome" : document.getElementById("nome").value,
                    "telefone" : document.getElementById("telefone").value,
                    "cidade": document.getElementById("cidade").value,
                    "estado": document.getElementById("estado").value,
                    "email": document.getElementById("email").value,
                    "informacoes" : document.getElementById("informacoes").value,
                    "categoria": document.getElementById("categoria").value,
                    };


    let listaContatos = recuperaListaContatos();
    
    let data = isEmpty(listaContatos)==true?[]:listaContatos;
    
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