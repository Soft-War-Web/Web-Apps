<template>
  <v-data-table
    :headers="headers"
    :items="bills"
    sort-by="name"
    class="elevation-1" style="width:70%">
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.billId }}</td>
        <td>{{ item.billDate }}</td>
        <td><span>Delivered</span></td>
        <td>S/.{{ item.amount }}.00</td>
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
            { text: 'Orden #', value: 'billId', sortable: true },
            { text: 'Fecha del pago', value: 'billDate', sortable: false },
            { text: 'Estado', value: 'ruc' , sortable: false },
            { text: 'Monto', value: 'amount', sortable: false },
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
            this.clientId=this.$route.params.id;
            this.list();
        },
        methods: {
            list(){
                let me = this;
                axios.get('api/Bills/GetBillByClient/'+this.clientId,{
                  'ClientId': this.clientId
                }).then(function(response){
                  console.log(response);
                  me.bills = response.data;
                }).catch(function(error){
                  console.log(error);
                });
            },
        },
    }
</script>