<template>
  <v-data-table
    :headers="headers"
    :items="bills"
    sort-by="name"
    class="elevation-1" style="width:70%"><!--Se agregó el style-->
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.ruc }}</td>
        <td>{{ item.billDate }}</td>
        <td><span>Delivered</span></td>
        <td>{{ item.amount }}</td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
    import axios from 'axios'
    export default {
      data: () => ({
          dialog: false,
          headers: [
            { text: 'id', value: 'ruc', sortable: true },
            { text: 'billDate', value: 'billDate', sortable: false },
            { text: 'estado', value: 'ruc' , sortable: false },
            { text: 'amount', value: 'amount', sortable: false },
          ],
          search: '',
          id: '',
          clientId: 0,
          bills: [],
          amount: '',
          ruc: '',
          billDate: new Date(),
        }),
        created () {
            this.list();
        },
        methods: {
            list(){
                let me = this;
                axios.get('api/Bills')
                .then(function(response){
                  console.log(response);
                  me.bills = response.data;
                }).catch(function(error){
                  console.log(error);
                });
            },
        },
    }
</script>