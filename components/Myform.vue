<!-- <template>
  <form id="form" @submit.prevent="send">
    <v-text-field
      v-model="city"
      counter="30"
      maxlength="30"
      label="Город"
      required
    ></v-text-field>
    <v-date-picker v-model="date" class="" no-title></v-date-picker>
    <v-text-field
      v-model="temperature"
      label="Температура"
      required
    ></v-text-field>
    <v-text-field v-model="humidity" label="Влажность" required></v-text-field>
    <v-text-field
      v-model="windspeed"
      label="Скорость ветра"
      required
    ></v-text-field>
    <v-btn color="error" class="mr-4" type="submit"> submit </v-btn>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      city: null,
      date: null,
      temperature: null,
      humidity: null,
      windspeed: null,
    };
  },
  methods: {
    send() {
      let bodyFormData = new FormData();
      bodyFormData.append("city", this.city);
      bodyFormData.append("date", this.date);
      bodyFormData.append("temperature", this.temperature);
      bodyFormData.append("humidity", this.humidity);
      bodyFormData.append("windspeed", this.windspeed);

      const requestOptions = {
        method: "POST",
        body: bodyFormData,
      };
      fetch(
        "https://graboviy.pythonanywhere.com/api-auth/records/",
        requestOptions
      );
      this.updateWeather(this.$store.state);
    },
    ...mapActions({
      updateWeather: "updateWeather",
    }),
  },
  computed: {},
};
</script>

<style></style> -->
