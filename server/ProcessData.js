$(document).ready(function() {
    console.log( "ready!" );
    $("#modalContent2").hide();
    $("#modalContent3").hide();
});

$(function () {
    var countButton = 0;
    $(function () {
        lastSelected = $('[name="preco"]:checked').val();
        console.log('entrou na function: last selected= ' + lastSelected);
        processJson();

    $(document).on('click', '[name="preco"]', function () {
        $("#preco").empty();
        $("#radiobutton1").empty();
        $("#radiobutton2").empty();
        $("#radiobutton3").empty();

        if (lastSelected != $(this).val() && typeof lastSelected != "undefined") {
            lastSelected = $(this).val();
        }
            processJson();
        });
    });

    function processJson(){
        $.getJSON('./server/data.json', function(data) {

            $.each(data.plans, function (i, plan) {
                var itemName = '#radiobutton' + plan.id;
                var cardclass = '.card' + plan.id;
                var plandiscount = '.planDiscount'+ plan.id +'>b';

                var contentName = '<div class="planName">' + plan.name + '</div>';
                contentName += '<div class="planDiscount' + plan.id + '">' + plan.discount + '</div>';
                $(contentName).appendTo(itemName);
                $('.planDiscount>b').css('color','#49CBA4');

                if (plan.id == lastSelected) {
                    var content = '<div class="allblocks"><div class="block1"> <p class="priceCurrency">' + plan.price.currency +'</p><p><br/></p></div> <div class="block2"> <p class="priceNumber"><b>' + plan.price.integer + '</b></p></div><div class="block3"><p class="priceDecimal">' + plan.price.decimal + '</p> <p class="pricePeriodicy">' + plan.price.periodicy + '</p></div></br>';
                    if (plan.id != 1)
                        content += '<p class="priceTotal">' + plan.total + '</p>';
                    content += '<hr style="border-top: dotted 2px;" /></div>';
                    content += '<div class="descriptionblock"><img class="imgContent" src="./src/img/icon-credit-card.svg"><p class="imgP">  ' + plan.payments[0] + '</p> <br/>';
                    content += '<img class="imgContent" src="./src/img/icon-debit.svg"><p class="imgP">  ' + plan.payments[1] + '</p> <br/>';
                    content += '<img class="imgContent" src="./src/img/icon-boleto.svg"><p class="imgP">  ' + plan.payments[2] + '</p> <br/></div>';
                    $(content).appendTo("#preco");
                    $(cardclass).css('background-color','#661577');
                    $(cardclass).css('color','#FFF');
                    $(plandiscount).css('color','#FFF');
                }
                else {
                    $(cardclass).css('background-color','#FFF');
                    $(cardclass).css('color','#661577');;
                }

            })
        })
    }

    $("#nextButton").click(function(e){
       countButton++;
       console.log(countButton);
       if (countButton == 1){
           $("#modalContent1").hide();
           $("#modalContent2").show();
            $("#nextButton").html('Concluir minha assinatura');
       }
       else if (countButton > 1){

            e.preventDefault();
            // Read form data
            var data = $("#modalContent2 :input").serializeArray();
            var displayText = "";
            var cardNumber = data[0];
            //var 
            /* exemplos de cartões válios:
            4000 0000 0000 0002
            4026 0000 0000 0002
            5018 0000 0009
            5100 0000 0000 0008
            6011 0000 0000 0004 */

            $(function() {
                $("#modalContent2 :input").validateCreditCard(function(result) {

                    if (!result.valid){
                        JSalert(0);
                    }  

                    else{
                        $("#modalContent2").hide();
                        $("#modalContent3").show();
                        $("#nextButton").hide();
                        $("#modalfooter").hide();
                    }

                });
            });
        }
    });

    function JSalert(validation){
        if (validation == 0){
            var textswal =  "Número do cartão de crédito inválido.";
        }

        swal({
            title: "Atenção!",
            text: textswal,
            icon: "warning",
            button: "Ok",
          });
    }
});
