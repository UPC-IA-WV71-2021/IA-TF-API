var Creates = function(){

    var events = {
        create: function(){
            $("#boton").on("click", function(e){
                e.preventDefault();

                console.log($("#hogarId").val());
                
                var data = {
                    hogarId: $("#hogarId").val(),
                    departamento : $("#departamento").val(),
                    provincia: $("#provincia").val(),
                    distrito: $("#distrito").val(),
                    area: $("#area-select").val(),
                    personaId: $("#personaId").val(),
                    genero: $("#genero-select").val(),
                    edad: Number($("#edad").val()),
                }
                

                $.ajax({
                    url: "http://172.24.240.1:9000/knn-personas",
                    method: "POST",
                    data: JSON.stringify(data),
                    dataType: 'json',
                    contentType: 'application/json',
                    processData: false,
                    success: function(result){ 
                        if(result.aprobado == true){
                            $("#estado").text("Aprobado");
                        }
                        else
                            $("#estado").text("No Aprobado");

                        localStorage.clear();
                        localStorage.setItem("hogarId", result.hogarId);
                        return false;
                    }
                })
                .done(function(result){
                    console.log(result);   
                })
                    .fail(function (error) {
                    console.log("algo se cayó");
                    });

            });
        }
    }

    return {
        init: function(){
            events.create();
        }
    }
}();
$(function(){
    Creates.init();
})