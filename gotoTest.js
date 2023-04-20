//No 1
function swap(a,b){
    a = a+b; 10
    b = a-b; 
    a = a-b;
    console.log(a+' '+b);
}

swap(4,6);


//No 2
function reverse(word){
    let wordSplit = word.split(' ');
    let construct = '';

    for (let i = 0; i < wordSplit.length; i++) {
        for (let index = wordSplit[i].length-1; index >= 0; index--) {
            construct = construct+wordSplit[i][index];
        }
        construct = construct+' ';
    }

    console.log(construct);
    
}

reverse('Hello World');

//No 3
function compression(word){
    let count=0;
    let temp;
    for (let index = 0; index < word.length; index++) {
        temp=word[index+1];
        if(index == word.length-1){
            count++;
            console.log(word[index]+count);
        }else if(word[index]!=temp){
            console.log(word[index]+count);
            count = 0;
        }else{
            count++;
        }
              
    }
}

compression('aaaabbbccd');


// //No 4

function changeTime(time){
    if(time.indexOf('AM')!=-1){
        if(time = '12:00:00AM'){
            console.log('00:00:00');
        }else{
            console.log(time.replace('AM',''));
        }
    }else{
        let timeSplit = time.split(':');
        let change = Number(timeSplit[0])+12;
        if(timeSplit[0] == '12'){
            change = '12';
        }

        console.log(change+':'+timeSplit[1]+':'+timeSplit[2].replace('PM',''));
    }
}

changeTime('12:00:00PM');

//No 5
function noLoop(start,number){
    if(start>number){
        return;
    }else{
        console.log(start);
        return noLoop(start+1,number);
    }
}

noLoop(1,10);