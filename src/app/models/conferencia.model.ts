export class Conferencias {
    constructor(
        public _id:string,
        public nombreCharla: String,
        public descripcion: String,
        public comunicador: String,
        public salon: String,
        public numeroAsiento: Number,
        public hora: Date,
        public fecha: String,
        public capacidad: Number,
        public image: String,
        public confirmado: Number,
        public llegados: [String],
        public ocupados: [String]
    ) { }
}