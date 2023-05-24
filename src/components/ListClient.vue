<template>
    <div class="container">
        <div>
            <div class="d-flex mb-5">
                <h1 class="title">Clients</h1>
                <div class="botones ms-auto e">
                    <b-link :to="{ name: 'create' }" class="btn btn-primary">Add Client</b-link>

                </div>
            </div>
            
            <div>
                <b-table striped hover :items="item" :fields="campos">
                    <template v-slot:cell(acciones)="row">
                        <b-button size="sm" variant="info" @click="editarRegistro(row.item.id)" class="mx-2">Editar</b-button>
                        <b-button size="sm" variant="danger" @click="btnDelete(row.item.id)">Eliminar</b-button>
                    </template>
                </b-table>
            </div>
        </div>
        <div>
        </div>
    </div>
</template>
    
<script >

import axios from 'axios';
import Swal from 'sweetalert2'
export default {
    name: "ComponentListClient",
    data() {
        return {
            item: [],
            campos: [
                { key: 'name', label: 'Nombre' },
                { key: 'dob', label: 'DOB' },
                { key: 'phone', label: 'Phone' },
                { key: 'email', label: 'Email' },
                { key: 'address', label: 'Address' },
                { key: 't_count', label: 'Payments' },
                { key: 't_total', label: 'Total' },
                { key: 'acciones', label: 'Acciones' }
            ]
        };
    },
    methods: {
        async getClients() {
            const response = await axios.get('http://127.0.0.1:8000/api/client/list')
            this.item = response.data
        },

        async deleteClient(id) {
            console.log(id);
            const response = await axios.delete(`http://127.0.0.1:8000/api/client/delete/${id}`);
            
            if (response.data.message == 'Exito') {
                Swal.fire(
                'Deleted!',
                'Se elimino Correctamente.',
                'success'
                )
              console.log("Se elimino Correctamente");

              this.getClients();
            }
        },
        editarRegistro(id) {

            console.log(id);
            this.$router.push({name:'edit',params:{id}})
        },

        btnDelete(id){
            Swal.fire({
            title: 'Estas seguro?',
            text: "Se eliminara un Registro!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.isConfirmed) {
                this.deleteClient(id)
                
            }
            })
        }

    },


    created() {
        this.getClients()
    },

};
</script>


<style scoped>
.title {
    text-align: left;
    font-size: 20px;
    font-weight: bold;
}

.button-add {
    text-align: right;
    font-size: 20px;
}
</style>
    