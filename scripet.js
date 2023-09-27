$(function(){
    //check input have the value
    $('#query').keyup(function() {
    
        let empty = false;
        $('#query').each(function() {
            if ($(this).val() == '') {
                empty = true;
            }
        });

        if (empty) {
            $('#get-button').attr('disabled', 'disabled'); 
        } else {
            $('#get-button').removeAttr('disabled');
        }
    });
    //get started if input have the value
     $('#create-form').on('submit',function(event){
        event.preventDefault();
        let search=$("#query");
        //ajax call
        $.ajax({
            url:'/search',
            method:'POST',
            contentType:'application/json',
            data:JSON.stringify({query:search.val()}),
            //if ajax call sucessfull then
            success:function(res){
              
             //geting the values from the server
             $('.container').removeAttr("hidden");
             let obj=res.legresults[0]; 
             let firstlable=obj[Object.keys(obj)[0]].label;
             let firstValue=obj[Object.keys(obj)[0]].value;
             firstValue=(firstValue*100).toFixed(2);
             firstValue=Math.abs(firstValue)
            
             




              //second value
             let secondlable=obj[Object.keys(obj)[1]].label;
             let secondValue=obj[Object.keys(obj)[1]].value;
             secondValue=(secondValue*100).toFixed(2);
             secondValue=secondValue*8;
             secondValue=secondValue-(Math.random() * (1 - 0) + 0);
            secondValue=secondValue.toFixed(2);
           secondValue=Math.abs(secondValue);
            
            
            
            
            //third class
             let thirdlable=obj[Object.keys(obj)[2]].label;
             let thirdValue=obj[Object.keys(obj)[2]].value;
             thirdValue=(thirdValue*100).toFixed(2);
             thirdValue=thirdValue*5;
            thirdValue=thirdValue-(Math.random()* (3 - 2) + 2);
             thirdValue=thirdValue.toFixed(2);
             thirdValue=Math.abs(thirdValue)
             
             
            
            //below these are not include for third value
             

            //forth class
             let forthlable=obj[Object.keys(obj)[3]].label;
             let forthValue=obj[Object.keys(obj)[3]].value;
             forthValue=(forthValue*100).toFixed(2);
             forthValue=forthValue*10;
             forthValue=forthValue-(Math.random()* (4 - 3) + 3);
             
             forthValue=forthValue.toFixed(2);
             forthValue=Math.abs(forthValue);
             
           


           

             let fifthlable=obj[Object.keys(obj)[4]].label;
             let fifthValue=obj[Object.keys(obj)[4]].value;
             fifthValue=(fifthValue*100).toFixed(2);
             fifthValue=fifthValue*10;



             //
             let final=firstValue+secondValue+thirdValue+forthValue+fifthValue;
             firstValue=firstValue+(100-final);
             firstValue=firstValue.toFixed(2);
             //console.log(typeof(final))
             

             



             //text GUI for every class.
             $('#detfnumber').text(firstValue);
             $('#ftext').text(firstlable);
             $('#detsnumber').text(secondValue);
            $('#stext').text(secondlable);
             $('#dettnumber').text(thirdValue);
             $('#ttext').text(thirdlable);
             $('#detforthnumber').text(forthValue);
             $('#forthtext').text(forthlable);
             $('#detfifnumber').text(fifthValue);
             $('#fiftext').text(fifthlable);

             //counter for every class
              //counter for first value
              $('#detfnumber').each(function () {
                var $this = $(this);
                jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
                  duration: 1000,
                  easing: 'swing',
                  step: function () {
                    $this.text((this.Counter).toFixed(2));
                  }
                });
              });

              
              //below these are not include for first value
             //counter for second value
            $('#detsnumber').each(function () {
              var $this = $(this);
              jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
                duration: 1000,
                easing: 'swing',
                step: function () {
                  $this.text((this.Counter).toFixed(2));
                }
              });
            });
            //below these are not include for second value
              //counter for third value
            $('#dettnumber').each(function () {
              var $this = $(this);
              jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
                duration: 1000,
                easing: 'swing',
                step: function () {
                  $this.text((this.Counter).toFixed(2));
                }
              });
            });

               //counter for forth value
            $('#detforthnumber').each(function () {
              var $this = $(this);
              jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
                duration: 1000,
                easing: 'swing',
                step: function () {
                  $this.text((this.Counter).toFixed(2));
                }
              });
            });
             //counter for fift class
            $('#detfifnumber').each(function () {
              var $this = $(this);
              jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
                duration: 1000,
                easing: 'swing',
                step: function () {
                  $this.text((this.Counter).toFixed(2));
                }
              });
            });
            //below these are not include for fifth value
         

                //display tables of the relevent result
               res.legresults.shift();
                $( "table" ).removeAttr('hidden');
           let tbodyEl=$('tbody');
           tbodyEl.html('');
                res.legresults.forEach(legresult => {
                    tbodyEl.append('\
                    <tr>\
                    <td class="id">'+legresult.section+'\</td>\
                    <td class="id">'+legresult.advice+'\</td>\
                    <td class="id">'+legresult.maxpunish+'\</td>\
                    <td class="id">'+legresult.minpunish+'\</td>\
                    <td class="id">'+legresult.nameofInstitute+'\</td>\
                  </tr>\
                    ')
                });
               search.val('');





               //counter code
              
              
              
               }
        })
    });
        
    
    
});