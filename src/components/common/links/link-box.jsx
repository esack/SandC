import React from 'react';
import PropTypes from 'prop-types';
import LinkBoxInfo from './link-box-info';

const LinkBox = ({ addClass, style, icon, fileContainer, onRemove, 
  name, description, link, client, token
}) => (
  <div className="col-md-4 col-sm-6 col-xs-12">
    <div className={"info-box " + addClass}>
      <span className={style != undefined ? 'info-box-icon' : 'info-box-icon bg-aqua'} style={style}>
        <i className={'fa ' + icon} />
        { fileContainer && fileContainer.approved_file_id ? <i className="fa fa-check" style={{ position: 'absolute', fontSize: '40px', bottom: '36px', left: '57px' }} /> : null }
        </span>
      <div className="info-box-content">
        {onRemove != undefined ?
          <div className="box-tools pull-right z-front">
            <button type="button" className="btn btn-box-tool" onClick={onRemove} data-widget="remove"><i className="fa fa-times"></i></button>
          </div> : null}
        <LinkBoxInfo name={name} 
          description={description} 
          link={link} 
          fileContainer={fileContainer} 
          client={client}
          token={token} />
      </div>
    </div>
  </div>
);


LinkBox.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  fileContainer: PropTypes.object,
  token: PropTypes.string,
  client: PropTypes.object,
  link: PropTypes.string,
  icon: PropTypes.string,
  addClass: PropTypes.string,
  onRemove: PropTypes.func,
  style: PropTypes.object
};

export default LinkBox;
