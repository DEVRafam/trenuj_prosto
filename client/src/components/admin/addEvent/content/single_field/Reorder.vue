<template>
    <div class="reorder" :class="{ develop }" v-if="totalElements > 1">
        <button class="order intro" @click="develop = !develop">Przesuń</button>
        <div class="reorder-options">
            <button class="order" v-if="moveDownAccess" @click="handleMove('down')">W dół</button>
            <button class="order" v-if="moveTopAccess" @click="handleMove('top')">W górę</button>
            <button class="order" @click="develop = !develop">Anuluj</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ["index", "totalElements", "eventData"],
    data() {
        return {
            develop: false
        };
    },
    computed: {
        moveDownAccess() {
            const { index, totalElements } = this;
            return index < totalElements - 1;
        },
        moveTopAccess() {
            const { index } = this;
            return index != 0;
        }
    },
    methods: {
        handleMove(direction) {
            const { eventData, index } = this;
            const { content } = eventData;
            //
            let data = [];
            if (direction === "down") {
                data = [
                    {
                        baseObjectIndex: index,
                        newObject: JSON.parse(JSON.stringify(content[index + 1]))
                    },
                    {
                        baseObjectIndex: index + 1,
                        newObject: JSON.parse(JSON.stringify(content[index]))
                    }
                ];
            }
            //
            else if (direction === "top") {
                data = [
                    {
                        baseObjectIndex: index,
                        newObject: JSON.parse(JSON.stringify(content[index - 1]))
                    },
                    {
                        baseObjectIndex: index - 1,
                        newObject: JSON.parse(JSON.stringify(content[index]))
                    }
                ];
            }
            //
            data.forEach(item => {
                // we gotta do like this, otherwise
                // references mechanisms won't work at all
                const { baseObjectIndex: index, newObject } = item;
                const { content } = this.eventData;
                // remove all properties in both object
                for (let key in content[index]) {
                    delete content[index][key];
                }
                //insert new properites
                for (let key in newObject) {
                    content[index][key] = newObject[key];
                }
                // trigger vue watcher
                content.unshift();
            });
        }
    }
};
</script>
