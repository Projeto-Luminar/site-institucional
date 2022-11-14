
    function cadastrar(){
        var nome = input_nome.value;
        var email = input_email.value;
        var senha = input_senha.value;
        var confirmar_senha = input_confirm_senha.value;
        var admin_validar = admin.checked;
        var comum_validar = comum.checked;

       if(nome == "" || email == "" || senha == "" || confirmar_senha == ""|| admin_validar == false && comum_validar == false){
        alert('Atenção! Todos os campos precisam estar preenchidos')
       }else if(email.indexOf("@") == -1 || email.indexOf("sptech.school") == -1 ){
        alert('E-mail inválido! Digite novamente.')
       }else if(senha < 8 ){
        alert('Senha muito curta! Digite uma senha com mais de 8 caracteres.')
       }else if(confirmar_senha != senha){
        alert('Senha inválida! Digite a mesma senha já informada.')
       }else{
        
       }
    }
