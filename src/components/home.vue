<template>
  <div>
    <label for="gene-data">Choose the gene data file:</label>
    <input
      type="file"
      id="gene-data"
      name="geneData"
      accept=".txt"
      @change="uploadGeneData"
    >

    <label for="gene-data-preview">Content Preview:</label>
    <textarea id="gene-data-preview">{{ previewText }}</textarea><br />

    <button
      class="submitbutton"
      :disabled="disabled"
      @click="handleSubmitGeneData"
    >Process</button>

    <label for="gene-data-result">Result:</label>
    <textarea id="gene-data-result">{{ outputText }}</textarea>
  </div>
</template>
<script>
export default {
  data() {
    return {
      disabled: this.$store.state.disabled,
      previewText: this.$store.state.previewText,
      outputText: this.$store.state.outputText
    };
  },
  methods: {
    uploadGeneData(event) {
      let formData = new FormData();
      let uploadFile = event.target.files[0];
      formData.append("file", uploadFile);
      let url = "/api/upload";
      let config = { headers: { "Content-Type": "multipart/form-data" } };
      this.axios.post(url, formData, config).then(response => {
        console.log(response.data);
        let _this = this;

        let reader = new FileReader();

        reader.onload = function(e) {
          _this.previewText = e.target.result;
          _this.outputText = "";
          _this.disabled = false;
        };

        reader.readAsText(uploadFile);
      });
    },

    handleSubmitGeneData(event) {
      let url = "/api/handle";
      this.axios.get(url).then(response => {
        console.log(response.data);
        this.outputText = response.data;
        this.disabled = true;
      });
    }
  }
};
</script>


<style>
label {
  display: block;
  font: 1rem "Fira Sans", sans-serif;
}

input,
label {
  margin: 0.4rem 0;
}

.note {
  font-size: 0.8em;
}
</style>
