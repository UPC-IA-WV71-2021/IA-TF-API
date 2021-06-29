var Creates = function(){

    var events = {
        create: function(){
            $("#boton").on("click", function(e){
                e.preventDefault();

                console.log($("#hogarId").val());
                
                var data = {
                    "name" : $("#name").val(),
                    "fever" : Number($("#fever-select").val()),
                    "tiredness": Number($("#tiredness-select").val()),
                    "dry-cough": Number($("#dry-cough-select").val()),
                    "difficulty-in-breathing": Number($("#difficulty-in-breathing-select").val()),
                    "sore-throat": Number($("#sore-throat-select").val()),
                    "nasal-congestion": Number($("#nasal-congestion-select").val()),
                    "runny-nose" : Number($("#runny-nose-select").val()),
                    "diarrhea": Number($("#diarrhea-select").val()),
                    "pains": Number($("#pains-select").val())
                }
/*
                $.ajax({
                    url: "http://127.0.0.1:9000/knn",
                    method: "POST",
                    data: JSON.stringify(data),
                    dataType: 'json',
                    contentType: 'application/json',
                    processData: false,
                    crossDomain: true,
                    success: function(result){ 

                        var knn = result.personas[0].estado;

                        $("#estadoknn").text("Usted tiene una probabilidad de " + knn + " según KNN");
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
                    */
                $.ajax({
                    url: "http://127.0.0.1:9000/cnn",
                    method: "POST",
                    data: JSON.stringify(data),
                    dataType: 'json',
                    contentType: 'application/json',
                    processData: false,
                    crossDomain: true,
                    success: function(result){

                        var cnn = (1 - result.estado[0]) * 100;

                        $("#estadocnn").text("Usted tiene una probabilidad de " + cnn.toFixed(7) + "% de estar contagiado");

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