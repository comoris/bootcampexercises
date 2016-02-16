$('#add').on('click', function(){
    var val1 = $('#inp1').val();
    var val2 = $('#inp2').val();
    var result = calculator.add(val1),val2);
    $('#result').text(result);
});

$('#multiply').on('click', function(){
    var val1 = $('#inp1').val();
    var val2 = $('#inp2').val();
    var result = calculator.multiply(val1,val2);
    $('#result').text(result);
});
