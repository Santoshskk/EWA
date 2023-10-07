<template>
  <form>
    <div class="container text-center">
      <div class="row align-items-start">
        <div class="col">
          <div class="container">
            <div class="container-md">
              <img v-if="item.profilePic" :src="profile.photo" class="pfp" alt="...">
              <img v-else src="@/assets/photo/profielfoto-silhouet.jpg" class="pfp" alt="...">
              <div class="mb-3" style="margin: 1rem;">
                <input type="file" accept="image/*" class="form-control" id="inputGroupFile02" @change="onChange">
              </div>
              <div class="mb-3">
                <label for="inputName" class="form-label">Name: </label>
                <input type="text" autocomplete="off" class="form-control" id="inputName" v-model="profile.name"
                       required>
                <div v-if="isNameEmpty" class="invalid-message border mt-1 error">
                  Name is required
                </div>
              </div>
              <div class="mb-3">
                <label for="inputBirthday" class="form-label">Birhtday: </label>
                <input type="date" min="1900-01-01" class="form-control" id="inputBirthday" v-model="profile.birth"
                       required>
                <div v-if="isBirthEmpty" class="invalid-message border mt-1 error">
                  Birthday is required
                </div>
              </div>
              <div class="mb-3">
                <label for="inputOccupation" class="form-label">Occupation: </label>
                <input type="text" autocomplete="off" class="form-control" id="inputOccupation"
                       v-model="profile.occupation" aria-required="true" required>
              </div>
              <div v-if="isOccupationEmpty" class="invalid-message border mt-1 error">
                Occupation is required
              </div>
              <button @click="saveEdit" type="submit" class="btn btn-primary editButton">Save</button>
              <button @click="cancelEdit" type="button" class="btn btn-secondary editButton">Cancel</button>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="mb-3">
            <label for="inputBio" class="form-label">Bio: </label>
            <textarea class="form-control" id="inputBio" autocomplete="off"
                      style="height: 25rem; width: 100%; resize: none" v-model="profile.bio" required></textarea>
            <div v-if="isBioEmpty" class="invalid-message border mt-1 error">
              Bio is required
            </div>
          </div>
        </div>
        <div class="col">
          <div class="mb-3">
            <label for="inputGoals">Goals</label>
          </div>
          <div class="container goalContainer">
            <div v-for="goal in profile.goals" :key="goal.id">
              <div class="container border rounded-4 mb-4 goals">
                <img :src="goal.image" class="col-1 goalImage mt-2" alt="...">
                <h6 class="col-6 goalTitle">{{ goal.title }}</h6>
                <i class="bi bi-trash"></i>
                <button @click="deleteGoal(goal.id)" class="col-1 btn btn-danger deleteGoalButton">Delete</button>
              </div>
            </div>
          </div>
          <div v-if="isGoalEmpty" class="invalid-message border mt-1 error">
            Goal is required
          </div>
          <div class="row mt-1">
            <div class="col-5">
              <label for="selectList">Select an goal:</label>
            </div>
            <div class="col">
              <select class="form-select" v-model="selectedOption" required>
                <option v-for="(goal, index) in sdgGoals" :key="index" :value="goal">
                  {{ goal }}
                </option>
              </select>
            </div>
          </div>
          <button @click="createGoal" type="button" class="btn btn-primary editButton">Add Goals</button>
          <div v-if="showGoalSDGEmpty" class="invalid-message border mt-1 error">
            Please select a valid goal.
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { Profile } from '@/models/profile'
import { Goal } from '@/models/goal'

export default {
  name: 'ProfilePage',
  data () {
    return {
      profile: new Profile(1, 'Steve Harold',
        '/assets/photo/profielfoto-silhouet.jpg',
        '1999-01-01', 'Software Engineer',
        'Hi I\'m a Software Engineer at the HvA!',
        [
          {
            id: 1,
            image: require('@/assets/SDG-Icons/E-WEB-Goal-01.png'),
            title: 'No Poverty'
          },
          {
            id: 2,
            image: require('@/assets/SDG-Icons/E-WEB-Goal-02.png'),
            title: 'Zero Hunger'
          },
          {
            id: 3,
            image: require('@/assets/SDG-Icons/E-WEB-Goal-03.png'),
            title: 'Good Health and Well Being'
          }
        ]),
      selectedOption: '',
      sdgGoals: [
        'No Poverty',
        'Zero Hunger',
        'Good Health and Well Being',
        'Quality Education',
        'Gender Equality',
        'Clean Water and Sanitation',
        'Affordable and Clean Energy',
        'Decent Work and Economic Growth',
        'Industry, Innovation, and Infrastructure',
        'Reduced Inequality',
        'Sustainable Cities and Communities',
        'Responsible Consumption and Production',
        'Climate Action',
        'Life Below Water',
        'Life on Land',
        'Peace, Justice, and Strong Institutions',
        'Partnerships for the Goals'
      ],
      item: {
        image: null,
        profilePic: null
      },
      oldProfileData: null,
      showGoalSDGEmpty: false
    }
  },
  created () {
    // Creates a copy of the profile
    this.oldProfileData = Profile.copyConstructor(this.profile)
  },
  methods: {
    onChange (e) {
      const file = e.target.files[0]
      this.image = file
      this.item.profilePic = URL.createObjectURL(file)
      this.profile.photo = this.item.profilePic
    },
    deleteGoal (id) {
      this.profile.goals = this.profile.goals.filter((goal) => goal.id !== id)
    },
    createGoal () {
      const goalLenght = this.profile.goals.length
      const increment = 1
      const newId = goalLenght + increment
      const selectedSDG = this.sdgGoals.find(goal => goal === this.selectedOption)
      if (selectedSDG) {
        // Create a new goal with the selected SDG title and image
        const newGoal = new Goal(newId, selectedSDG)
        // newGoal.title = selectedSDG
        this.profile.goals.push(newGoal)

        // Clear the selectedOption after adding the goal
        this.selectedOption = ''
      } else {
        this.showGoalSDGEmpty = true
      }
    },
    cancelEdit () {
      if (confirm('Are you sure you want to undo your changes?') === true) {
        console.log('Before reset:', this.profile)
        const name = this.oldProfileData.name
        const photo = this.oldProfileData.photo
        const birth = this.oldProfileData.birth
        const occupation = this.oldProfileData.occupation
        const bio = this.oldProfileData.bio
        const goals = this.oldProfileData.goals
        this.profile.name = name
        this.profile.photo = photo
        this.profile.birth = birth
        this.profile.occupation = occupation
        this.profile.bio = bio
        this.profile.goals = goals
        alert('Changes have been undone')
      }
    },
    saveEdit () {
      // Check if name, birth, occupation, bio and goals are not empty
      if (this.profile.name === '' ||
        this.profile.birth === '' ||
        this.profile.occupation === '' ||
        this.profile.bio === '' ||
        this.profile.goals.length === 0) {
        return alert('Some of the fields are empty')
      } else {
        if (confirm('Are you sure you want to save changes?') === true) {
          const id = this.profile.id
          const name = this.profile.name
          const photo = this.profile.photo
          const birth = this.profile.birth
          const occupation = this.profile.occupation
          const bio = this.profile.bio
          const goals = this.profile.goals
          // Overwrite old data with newely input data
          this.profile = new Profile(id, name, photo, birth, occupation, bio, goals)
          alert('Changes have been saved')
          this.oldProfileData = Profile.copyConstructor(this.profile)
          this.$router
            .push({ path: '/' })
        }
      }
    }
  },
  computed: {
    isNameEmpty () {
      // Check if the name is an empty string
      return this.profile.name.trim() === ''
    },
    // Check if the birth is an empty string
    isBirthEmpty () {
      return this.profile.birth.trim() === ''
    },
    // Check if the occupation is an empty string
    isOccupationEmpty () {
      return this.profile.occupation.trim() === ''
    },
    // Check if the bio is an empty string
    isBioEmpty () {
      return this.profile.bio.trim() === ''
    },
    // Check if the goal is an empty array
    isGoalEmpty () {
      return this.profile.goals.length === 0
    }
  }
}
</script>

<style>
.pfp {
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 60px;
}

.editButton {
  margin: 0.5rem;
  width: 7.5rem;
  border-radius: 20px;
  align-self: center;
}

.goalContainer {
  max-height: 25rem;
  overflow: auto
}

.deleteGoalButton {
  width: 25%;
  height: 50%;
  align-self: center;
}

.goalImage {
  width: 23%;
  height: 80%;
}

.goals {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 5rem;
}

.goalTitle {
  margin-top: 1rem;
  text-align: center;
}

.error {
  color: red;
}
</style>
