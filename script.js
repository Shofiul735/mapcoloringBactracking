class MapColoringClass{

    graph={
        rangpur: [ 'rajshahi', 'mymensingh' ],
        rajshahi: [ 'rangpur', 'mymensingh', 'khulna', 'dhaka' ],
        mymensingh: [ 'rangpur', 'rajshahi', 'dhaka', 'sylhet'],
        sylhet: [ 'mymensingh', 'chittagong' ],
        khulna: [ 'rajshahi', 'dhaka', 'barishal' ],
        dhaka: [ 'rajshahi', 'mymensingh', 'khulna', 'chittagong', 'barishal'],
        chittagong: ['sylhet', 'dhaka', 'barishal' ],
        barishal: [ 'khulna', 'dhaka', 'chittagong' ]
    }
    colors=["red","green","blue","yellow"];

    mapColoring(){
        let results={};
        let vertices = Object.keys(this.graph);
        let index=0;

        if(!mapColoringRecursive(this.graph,this.colors,results,vertices[index],index+1)){
            console.log("Solution is not possible");
            return false;
        }

        function mapColoringRecursive(graph,colors,results,vertex,i){
            if(vertex === undefined)
                return true;
            for(let i1=0;i1<colors.length;i1++){
                if(safe(graph,vertex,results,colors[i1])){
                    if(results[vertex] === undefined){
                        results[vertex]=colors[i1];
                        break;
                    }
                }else if(safe(graph,vertex,results,colors[i1])===false && i1===colors.length-1){
					return false;  
				}
            }
                if(mapColoringRecursive(graph,colors,results,vertices[i],i+1)){
                    return true;
                }
            
            return false;
        }
        
        function safe(g,v,results,c){
            
            function findSafeColor(g,v,results,c,index){
                if(g[v][index] === undefined)
                    return true;
                if(c === results[g[v][index]])
                    return false;
                return findSafeColor(g,v,results,c,index+1);
            }
            return findSafeColor(g,v,results,c,0);
            
        }


        return results;
     }
}
const a = new MapColoringClass();
const result=a.mapColoring();
console.log(result);
for(let i in result){
	if(i != "mymensingh")
		document.getElementById("division-"+i).classList.add(result[i]);
}