<template>
    <v-container>
        <v-row>
            <v-col cols="12" lg="8" offset-lg="2" xl="6" offset-xl="3">
                <h1 class="mb-4">My Tasks</h1>

                <oops-alert v-if="error" :error="error" />

                <v-row class="d-flex align-center mb-4" dense no-gutters>
                    <v-col>
                        <v-form @submit.prevent="addTask">
                            <v-text-field
                                v-model="newTaskTitle"
                                variant="solo"
                                style="height: 60px;"
                                :hide-details="true"
                                :placeholder="placeholder">
                                <template #append-inner>
                                    <v-btn
                                        type="submit"
                                        color="primary"
                                        variant="flat"
                                        rounded="false"
                                        class="rounded-s-0"
                                        style="height: 60px; margin-right: -.8em; margin-left: .8em;"
                                        size="large"
                                        @click="addTask">
                                        Add Task
                                        <v-icon icon="mdi-plus" class="ml-3"/>
                                    </v-btn>
                                </template>
                            </v-text-field>
                        </v-form>
                    </v-col>
                </v-row>
                <v-card :loading="loadingTasks || sendingTask || deletingTasks">
                    <div v-if="loadingTasks">
                        <v-progress-linear indeterminate color="primary" />
                    </div>
                    <div v-else-if="tasks.length === 0" class="pa-6">
                        <img src="@/../images/rocket.png" class="mx-auto d-block" style="max-width: 100px;" alt="No tasks" />
                        <p class="text-center font-weight-bold text-h6 mt-4 mb-2">You have no tasks</p>
                        <p class="text-center">Try adding one above</p>
                    </div>
                    <div v-else>
                        <template v-for="task in tasks" :key="task.id" >
                            <div class="d-flex align-center px-4 " :style="{ 'background-color': task.completed ? '#e8f5e9' : 'transparent' }">
                                <v-checkbox
                                    v-model="task.completed"
                                    :disabled="task.isDeleting"
                                    :loading="task.isDeleting"
                                    :hide-details="true"
                                    color="primary"
                                    class="mr-4"
                                    @change="updateTask(task)">
    
                                    <template v-slot:label>
                                        <v-text-field 
                                            :class="{ 
                                                'font-weight-bold': task.completed_at === null,
                                            }" 
                                            class="ml-3 mt-n2"
                                            density="compact"
                                            :hide-details="true"
                                            :disabled="task.isDeleting"
                                            v-model="task.title"
                                            variant="plain"
                                            @change="updateTask(task)" />
                                        <v-progress-circular size="small" class="ml-3" indeterminate color="primary" v-if="task.isDeleting" />
                                    </template>
                                </v-checkbox>
                                <v-spacer />
                                <v-btn 
                                    icon="mdi-delete" 
                                    variant="text" 
                                    color="error" 
                                    @click="removeTask(task)" 
                                    :loading="task.isDeleting" />
                            </div>
                            <v-divider />
                        </template>

                        <div class="text-medium-emphasis text-right px-4 my-4">
                            {{ footerText }}
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
import OopsAlert from '@/components/OopsAlert.vue';
import { getRandomTaskName } from '../services/randomTaskName';

export default {
    components: {
        OopsAlert,
    },

    data() {
        return {
            /**
             * Indicates if we are loading tasks from the API.
             */
            loadingTasks: false,

            /**
             * Indicates if we are sending a task to the API.
             */
            sendingTask: false,

            /**
             * Indicates if we are deleting tasks from the API.
             */
            deletingTasks: false,

            /**
             * The error occurred when loading or sending tasks.
             * 
             * @type {Error|null}
             */
            error: null,

            /**
             * The new task title.
             * 
             * @type {string}
             */
            newTaskTitle: '',

            /**
             * The list of tasks.
             * 
             * @type {{ id: number, title: string, completed_at: string|null, completed: boolean }[]}
             */
            tasks: [],

            /**
             * The placeholder text for the new task input.
             * 
             * @type {string}
             */
            placeholder: '',
        };
    },

    created() {
        this.placeholder = getRandomTaskName();

        this.refreshTasks();
    },

    computed: {
        /**
         * Indicates if we are busy loading or sending tasks.
         * 
         * @returns {boolean}
         */
        isBusy() {
            return this.loadingTasks || this.sendingTask || this.deletingTasks;
        },

        /**
         * The footer text.
         * 
         * @returns {string}
         */
        footerText() {
            const total = this.tasks.length;
            const completed = this.tasks.filter(t => t.completed_at !== null).length;

            if (total === completed) {
                return 'All tasks completed';
            }

            return `${completed} of ${total} task${total === 1 ? '' : 's'} completed`;
        },
    },

    methods: {
        /**
         * Refresh the tasks from the API.
         */
        async refreshTasks() {
            if (this.isBusy) return;

            this.loadingTasks = true;
            this.error = null;

            try {
                const response = await axios.get('/api/tasks');

                this.tasks = response.data.data.map(task => ({
                    ...task,
                    completed: task.completed_at !== null,
                })).sort((a, b) => {
                    if (a.created_at > b.created_at) return -1;
                    if (a.created_at < b.created_at) return 1;
                    return 0;
                });
            } catch (e) {
                this.error = e;
            } finally {
                this.loadingTasks = false;
            }
        },

        /**
         * Add a new task from the user input.
         */
        async addTask() {
            if (this.isBusy) return;

            const title = this.newTaskTitle.trim();
            if (!title) return;


            this.sendingTask = true;
            this.error = null;

            try {
                const { data } = await axios.post('/api/tasks', {
                    title: this.newTaskTitle,
                });

                this.tasks.push(data);
                this.newTaskTitle = '';
                this.placeholder = getRandomTaskName();
            } catch (e) {
                console.error(e);
                this.error = e;
            } finally {
                this.sendingTask = false;
            }
        },

        /**
         * Remove a task from the API.
         * 
         * @param {{ id: number, title: string, completed_at: string|null, completed: boolean }} task 
         */
        async removeTask(task) {
            if (this.isBusy) return;

            this.sendingTask = true;

            try {
                await axios.delete(`/api/tasks/${task.id}`);

                this.tasks = this.tasks.filter(t => t.id !== task.id);
            } catch (e) {
                console.error(e);
                this.error = e;
            } finally {
                this.sendingTask = false;
            }
        },

        /**
         * Send a task to the API to update it.
         * 
         * @param {{ id: number, title: string, completed_at: string|null, completed: boolean }} task 
         */
        async updateTask(task) {
            if (this.isBusy) return;

            this.sendingTask = true;
            try {
                const { data } = await axios.put(`/api/tasks/${task.id}`, {
                    completed: task.completed,
                    title: task.title,
                });

                const index = this.tasks.findIndex(t => t.id === task.id);
                this.tasks[index] = {
                    ...data,
                    completed: data.completed_at !== null,
                };
            } catch (e) {
                console.error(e);
                this.error = e;
            } finally {
                this.sendingTask = false;
            }
        },
    },
};
</script>
