export default {
    namespaced: true,
    state: {
        galleryVisualization: [],
        logoVisualization: "",
        currentStage: "upload"
    },
    mutations: {
        setLogoVisualization: (state, val) => (state.logoVisualization = val),
        //
        setCurrentStage: (state, val) => (state.currentStage = val),
        //
        addToGallery: (state, item) => state.galleryVisualization.push(item),
        //
        removeFromGallery: (state, index) => {
            state.galleryVisualization.splice(index, 1);
        }
    }
};
