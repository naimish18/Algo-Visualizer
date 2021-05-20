import React from 'react';
import './Searching.css';

const array_length=24;
var new_array_f=1;
var time1=1000;

export default class Searching extends React.Component{
    constructor(props){
        super(props);
        this.state={
            array: [],
        };
    }
    componentDidMount() {
        this.newArray();
    }

    newArray(flag){
        if(new_array_f==1){
            document.getElementById('info').innerHTML='';
            const array = [];
        if(flag){
            const array_circle=document.getElementsByClassName('values');
            for (let i = 0; i < array_length; i++) {
                array_circle[i].style.backgroundColor='rgb(0, 196, 189)';
                array.push(randomValue(-100, 100));
            }
        }
        else{
            for (let i = 0; i < array_length; i++) {
                array.push(randomValue(-100, 100));
            }
        }
        this.setState({array});
        }
        time1=1000;
    }
    linear_search(){
        document.getElementById('info').innerHTML='';
        var val=document.getElementById('inp').value;
        if(val=='' || val==null){
            document.getElementById('info').innerHTML='Please Enter Value!';
        }
        else{
            var time=1000;
            const array_circle=document.getElementsByClassName('values');
            new_array_f=0;
            for(let i=0;i<array_length;i++){
                if(val==array_circle[i].innerHTML){
                    var t=setTimeout(()=>{
                        array_circle[i].style.backgroundColor='green';
                },i*time);
                }
                else{
                    var t=setTimeout(()=>{
                        array_circle[i].style.backgroundColor='red';
                },i*time);
                }
            setTimeout(()=>{
                new_array_f=1;
            },24*time1);     
        }
        }
        time1=0;
        
    }

    search(start,end,value){
        
        const array_circle=document.getElementsByClassName('values');
        var flag2=0;
        var mid;
        var time=2000;
        var arr=[];
        while(start<=end){
            mid=Math.floor(start+(end-start)/2);
            document.getElementById('info').innerHTML=array_circle[mid].innerHTML+mid+'v'+value;

            arr.push(mid);
            if(Number(array_circle[mid].innerHTML)==Number(value)){
                break;
            }
            else if(Number(array_circle[mid].innerHTML)<Number(value)){
                start=mid+1;
                
            }
            else{
                end=mid-1;
            }

        }
        for(let i=0;i<arr.length;i++){
            if(Number(array_circle[arr[i]].innerHTML)==Number(value)){
                flag2=1;
                setTimeout(()=>{
                    array_circle[arr[i]].style.backgroundColor='green';
                    document.getElementById('info').innerHTML='Middle Index:- '+arr[i];
                },i*time);
            }
            else{
                setTimeout(()=>{
                    array_circle[arr[i]].style.backgroundColor='red';
                    document.getElementById('info').innerHTML='Middle Index:- '+arr[i];
                },i*time);
            }
        }
        if(flag2){
            setTimeout(()=>{
                document.getElementById('info').innerHTML='Number Found!';
            },(arr.length)*time);
        }
        else{
            setTimeout(()=>{
                document.getElementById('info').innerHTML='Number Not Found!';
            },(arr.length)*time);
        }
        
    }

    binary_search(){
        document.getElementById('info').innerHTML='';
        var val=document.getElementById('inp').value;
        
        if(val=='' || val==null){
            document.getElementById('info').innerHTML='Please Enter Value!';
        }
        else{
            const {array}=this.state;
            array.sort((a,b)=>a-b);
            new_array_f=0;
            const array_circle=document.getElementsByClassName('values');
            for(let j=0;j<array_length;j++){
                setTimeout(()=>{
                    array_circle[j].innerHTML=array[j];
                    array_circle[j].style.backgroundColor='yellow';
                },j*500);
  
            }
            setTimeout(()=>{
                document.getElementById('info').innerHTML='Sorting the Array...';
            },0);
            setTimeout(()=>{
                document.getElementById('info').innerHTML='Array is Sorted';
            },13000);
            setTimeout(()=>{
                this.search(0,23,val);
                new_array_f=1;
            },15000);
            
            
        }
    }

    render(){
        const {array} = this.state;
        return(
            <div className='main_menu'>
                <div className='menu'>
                    <div>
                        <button className='header'>Searching Algorithms</button>
                    </div>
                    <div id='second_div'>
                        <button id='new_arr' onClick={() => this.newArray(1)}>Generate New Array</button>
                        <div id='label_inp'>
                            <label htmlFor="inp">Enter Number To Search</label>
                            <input id='inp' type="number"/>
                        </div>
                        <button id='new_arr' onClick={()=>this.linear_search()}>Linear Search</button>
                        <button id='new_arr' onClick={()=>this.binary_search()}>Binary Search</button>
                    </div>
                </div>
                <div>
                    <h2 id='info'></h2>
                </div>
                <div className='array_container'>
                    {array.map((value,idx)=>(
                        <span className='values' key={idx}>
                            {value}
                        </span>
                    ))}
                </div>
            </div>
        );
    }
}

function randomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}