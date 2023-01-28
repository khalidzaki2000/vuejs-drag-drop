<template>
  <div class="app app-header-fixed">
    <h1>Introductory VueJS Project for Evaluation</h1>
    <div class="spalte" style="display: inline-block; width: 60%">
      <table class="stundenplan">
        <tr class="wochentage">
          <td></td>
          <td v-for="wochentag in wochentage" :key="wochentag">
            {{ wochentag }}
          </td>
        </tr>
        <tr v-for="(stunde, stundeIndex) in stunden" :key="stunde">
          <td>{{ stunde }}. Stunde</td>
          <td
            v-for="(wochentag, wochentagIndex) in wochentage"
            :key="`[${stundeIndex},${wochentagIndex}]`"
            @drop="onDrop($event, stundeIndex, wochentagIndex)"
            @dragover.prevent
            @dragenter.prevent
          >
            Platzhalter für {{ stunde }}/{{ wochentag }}
            <ul v-if="dataCells.length > 0">
              <li
                class="teacher-list-item"
                v-for="name in dataCells[stundeIndex].columns[wochentagIndex]
                  .teachers"
                :key="name"
              >
                {{ name }}
              </li>
            </ul>
            <ul v-else>
              <li
                class="teacher-list-item"
                v-for="name in computedCells[stundeIndex].columns[
                  wochentagIndex
                ].teachers"
                :key="name"
              >
                {{ name }}
              </li>
            </ul>
          </td>
        </tr>
      </table>
    </div>
    <div class="spalte" style="display: inline-block; width: 30%">
      <ul class="verfuegbare_lehrer_liste">
        <li
          class="teacher-list-item teachers-list-move-cruser"
          v-for="lehrername in lehrer_sortiert"
          :key="lehrername"
          draggable="true"
          @dragstart="startDrag($event, lehrername)"
        >
          {{ lehrername }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SWOP",
  data() {
    return {
      lehrer: ["Khaled", "Jan", "Thomas", "Peter", "Fritz", "Fix", "Foxy"],
      wochentage: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"],
      dataCells: [],
    };
  },
  components: {},
  computed: {
    lehrer_sortiert() {
      let ret = [...this.lehrer];
      return ret.sort();
    },
    stunden() {
      return [1, 2, 3, 4, 5, 6, 7, 8];
    },
    computedCells() {
      return this.stunden.map((stu) => {
        let days = this.wochentage.map((day, index) => {
          return { column: index, teachers: [] };
        });
        return { row: stu - 1, columns: days };
      });
    },
  },
  watch: {},
  methods: {
    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "copy";
      evt.dataTransfer.setData("teacherName", item);
    },
    onDrop(evt, row, column) {
      const teacherName = evt.dataTransfer.getData("teacherName");
      const rowData = this.computedCells.find((item) => {
        return item.row == row;
      });
      const columnData = rowData.columns.find((item) => item.column == column);
      const isAlreadyAddedTeacher = columnData.teachers.includes(teacherName);
      if (!isAlreadyAddedTeacher) {
        columnData.teachers.push(teacherName);
        this.dataCells = JSON.parse(JSON.stringify(this.computedCells));
      }
    },
  },

  mounted() {},
  created() {},
};
</script>

<style>
table.stundenplan {
  border-collapse: collapse;
}
table.stundenplan td {
  border-style: solid;
  border-width: 1px;
  border-color: #eee;
  padding: 5px;
}
.spalte {
  vertical-align: top;
}
.teachers-list-move-cruser {
  cursor: move;
}
.teacher-list-item {
  max-width: 60px;
  min-width: max-content;
  height: 30px;
  margin-top: 12px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  box-shadow: -2px 0px 6px 1px rgba(128, 77, 62, 0.78);
  list-style-type: none;
  border-radius: 2px;
  background-color: #cbf6e5;
}
</style>
