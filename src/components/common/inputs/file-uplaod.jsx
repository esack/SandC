import React from 'react';
import PropTypes from 'prop-types';
import DropzoneComponent from 'react-dropzone-component';

class FileUpload extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadWidth: 0,
            uploadFinish: false,
            uploadInterval: null
        }

        this.setDropzoneFile = this.setDropzoneFile.bind(this);
        this.dropzoneInit = this.dropzoneInit.bind(this);
        this.startSave = this.startSave.bind(this);
        this.endSave = this.endSave.bind(this);

        this.componentConfig = {
            showFiletypeIcon: false,
            postUrl: 'no-url',
            maxFiles: 1
        };

        var _this = this;

        this.eventHandlers = {
            addedfile: (file) => _this.setDropzoneFile(file),
            init: (dropzone) => _this.dropzoneInit(dropzone)
        }

        this.djsConfig = {
            dictDefaultMessage: 'Drop files here or click to upload',
            autoProcessQueue: false
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.upload_state === "start") {
            this.startSave()
        }
        else if (nextProps.upload_state === "end") {
            this.endSave()
        }
    }

    dropzoneInit(dropzone) {
        dropzone.options.maxFiles = 1;
        this.setState({ dropzone: dropzone });
    }

    setDropzoneFile(file) {
        this.props.setFile(file)

        $(".dz-progress").hide();
    }

    startSave() {
        $(".dz-progress").show();
        
        var _this = this;
            
        _this.setState({ uploadWidth: 0 });
        _this.setState({ uploadFinish: false });
        
        var uploadInterval = setInterval(function () {
            _this.setState({ uploadWidth: _this.state.uploadWidth + 1 });

            if (_this.state.uploadWidth > 150 && _this.state.uploadFinish === false) {
                _this.setState({ uploadWidth: -10 });
            }

            $(".dz-upload").width(_this.state.uploadWidth);
        }, 30);

        _this.setState({ uploadInterval: uploadInterval });
    }

    endSave() {
        var _this = this;

        _this.setState({ uploadFinish: true });

        var waitForUploadInterval = setInterval(function () {
            if (_this.state.uploadWidth >= 100) {
                clearInterval(waitForUploadInterval);
                clearInterval(_this.state.uploadInterval);

                $(".dz-progress").hide();
                $(".dz-preview").addClass("dz-success");

                setTimeout(function () {
                    if(_this.props.finishUpload != undefined)
                        _this.props.finishUpload();
                }, 5000)
            }
        }, 30);
    }


    render() {
        return (
            <DropzoneComponent config={this.componentConfig} djsConfig={this.djsConfig} eventHandlers={this.eventHandlers} />
        )
    };
}

FileUpload.propTypes = {
    upload_state: PropTypes.string,
    setFile: PropTypes.func.isRequired,
    finishUpload: PropTypes.func
}

export default FileUpload;
