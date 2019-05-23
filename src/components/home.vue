<template>
  <div>
    <el-row type="flex" justify="center">
      <el-upload
        id="upload-gene-file"
        class="upload-gene-file"
        drag
        action=""
        :on-change="uploadGeneData"
        :auto-upload=false
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          Drop file here or
          <em>click to upload</em>
        </div>
        <div class="el-upload__tip" slot="tip">txt file with no more than 50 sequences</div>
      </el-upload>
    </el-row>
    <el-row type="flex" justify="center">
      <el-button
        type="default"
        class="submit-button"
        :disabled="disabled"
        @click="handleSubmitGeneData"
        icon="el-icon-magic-stick"
        round
      >Process</el-button>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-row>
          <p class="gene-label">Content Preview:</p>
        </el-row>
        <el-row>
          <el-input id="preview-text" class="preview-text" type="textarea" v-model="previewText"></el-input>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row>
          <p class="gene-label">Result:</p>
        </el-row>
        <el-row>
          <el-input id="result-text" class="result-text" type="textarea" v-model="outputText"></el-input>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      disabled: this.$store.state.disabled,
      previewText: this.$store.state.previewText,
      outputText: this.$store.state.outputText,
      uploadForm: new FormData()
    };
  },
  methods: {
    uploadGeneData(file) {
      this.disabled = false;
      this.outputText = "";

      let uploadFile = file.raw;
      let reader = new FileReader();
      let _this = this;

      reader.onload = function(e) {
        _this.previewText = e.target.result;
      };

      reader.readAsText(uploadFile);

      this.uploadForm.set('file', file.raw);
    },

    handleSubmitGeneData(event) {
      let url = "/api/upload";
      let config = { headers: { "Content-Type": "multipart/form-data" } };

      let formData = this.uploadForm

      this.axios.post(url, formData, config).then(response => {
        console.log(response.data);
        this.outputText = response.data;
        this.disabled = true;
      });
    }
  }
};
</script>


<style>
.gene-label {
  color: #606266;
  font-size: 14px;
}
</style>
