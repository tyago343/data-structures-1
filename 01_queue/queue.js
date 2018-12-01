function Queue(){
    var arr = [];
    var contador = 0;
    var head = 0;
    var tail = 0;

    this.enqueue = function(param){
        arr[tail] = param;
        tail++;
        contador++; //Length
    }

    this.dequeue = function(){
        if(contador == 0){
            return undefined;
        } else{
            var ayuda = arr[head];
            arr[head] = undefined;
            head++;
            contador--; //Length
            return ayuda;
        }
    }

    this.size = function(){
        if(contador <= 0){
            return 0;
        }else{
            return contador;

        }
    }

}