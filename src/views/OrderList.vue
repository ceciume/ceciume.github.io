
<template>
  <v-table density="compact">
    <thead>
      <tr>
        <th class="text-left">
          订单名称
        </th>
        <th class="text-left">
          相关链接
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in desserts"
        :key="item.name"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
      </tr>
    </tbody>
  </v-table>
</template>


<script>
  export default {
    data () {
      return {
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 'https://example.com/platform1',
          },
          {
            name: 'Ice cream sandwich',
            calories: 'https://example.com/platform1',
          },
          {
            name: 'Eclair',
            calories: 'https://example.com/platform1',
          },
          {
            name: 'Cupcake',
            calories: 'https://example.com/platform1',
          },
          {
            name: 'Gingerbread',
            calories: 'https://example.com/platform1',
          },
          {
            name: 'Jelly bean',
            calories: 'https://example.com/platform1',
          },
          {
            name: 'Lollipop',
            calories: 'https://example.com/platform1',
          },
          {
            name: 'Honeycomb',
            calories: 'https://example.com/platform1',
          },
          {
            name: 'Donut',
            calories: 'https://example.com/platform1',
          },
          {
            name: 'KitKat',
            calories: 'https://example.com/platform1',
          },
        ],
      }
    },
  }
</script>
