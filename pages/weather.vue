<template>
  <div class="container">
    <h1 class="mb-12">Записи</h1>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header color="purple darken-3">
          <span class="title">Добавить новую запись</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="pt-4">
          <Myform></Myform>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-spacer></v-spacer>
    <v-select v-model="sort" :items="items" label=""></v-select>
    <v-spacer></v-spacer>
    <v-select v-model="filter" :items="filters" label="Фильтрация"></v-select>
    <v-spacer></v-spacer>
    <div class="text-center">
      <v-pagination v-model="page" :length="6"></v-pagination>
    </div>
    <v-row>
      <v-col
        cols="12"
        sm="4"
        v-for="weath in this.paginate"
        :key="weath.id"
        class=""
      >
        <v-card
          class="mx-auto widget mt-4"
          max-width="240"
          min-height="215"
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="purple-ish title text-h6 mb-5">
                Город: {{ weath.city }}
              </v-list-item-title>
              <v-list-item-subtitle class="mb-1"
                >Дата: {{ weath.date }}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="mb-1"
                >Температура: {{ weath.temperature }}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="mb-1"
                >Влажность: {{ weath.humidity }}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="mb-1 yellow-ish"
                >Скорость ветра: {{ weath.windspeed }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import Myform from "../components/Myform.vue";
export default {
  name: "IndexPage",
  data() {
    return {
      page: 1,
      filter: "Без фильтра",
      items: [
        "Сортировка по температуре (убывание)",
        "Сортировка по температуре (возрастание)",
      ],
      sort: "Сортировка по температуре (убывание)",
      filters: ["Без фильтра", "Нулевая температура"],
      sorted: [],
    };
  },
  computed: {
    ...mapGetters({
      form: "form",
      formIsLoaded: "formIsLoaded",
      weather: "weather",
    }),

    paginate() {
      if (this.weather.results === undefined) {
        return [];
      }
      let sortedItems = [...this.weather.results];

      if (this.filter === "Нулевая температура") {
        sortedItems = sortedItems.filter((item) => item.temperature === 0);
      }

      if (this.sort === "Сортировка по температуре (убывание)") {
        sortedItems = sortedItems.sort((a, b) => {
          if (a.temperature < b.temperature) {
            return 1;
          } else return -1;
        });
      }

      if (this.sort === "Сортировка по температуре (возрастание)") {
        sortedItems = sortedItems.sort((a, b) => {
          if (a.temperature > b.temperature) {
            return 1;
          } else return -1;
        });
      }

      this.sorted = sortedItems;

      let offset;
      if (this.page === 1) {
        offset = 0;
      } else offset = (this.page - 1) * 6 - 1;
      if (!this.sorted) {
        return [];
      }
      return this.sorted.slice(offset, offset + 6);
    },
  },
  methods: {
    ...mapActions({
      fetchWeather: "fetchWeather",
    }),
  },
  watch: {
    page() {
      this.fetchWeather(this.page);
    },
  },
  components: { Myform },
};
</script>

<style>
.title {
  font-size: 24px;
  text-overflow: initial !important;
  white-space: normal !important;
}
.yellow-ish {
  color: rgb(255, 217, 0) !important;
}
.purple-ish {
  color: rgb(137, 53, 179) !important;
}
.red-ish {
  color: rgb(219, 102, 102) !important;
}
</style>
