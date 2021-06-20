<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <table>
      <tr>
        <td>Title</td>
        <td width="550">Description</td>
        <td width="100" align="center">Action</td>
      </tr>
      <tr v-for="user in users" :key="user">
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import UsersService from "@/services/UserService";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      this.users = [];
      let users = await UsersService.fetchUsers();
      console.log(users.data);
      this.users = users.data.users;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
