export class User{
    constructor(
        public _id:string,
        public carnet: string,
        public nombre:string,
        public email:string,
        public password:string,
        public rol:string,
        public productosVendidos: [{
            productTableId: string,
            nombreProducto: string,
            cantidad: number,
            precioIndividual:number,
            totalProducto:number
        }],
        public totalVendido: number,
        public image:string
    ){}
}