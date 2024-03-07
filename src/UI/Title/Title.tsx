import type { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

interface ITitleProps {
  selectedItems?: number[];
  onDeleteItems?: () => {};
}

const Title: FC<ITitleProps> = ({ selectedItems, onDeleteItems }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="mb-15 flex jst-between">
      <h2 className="title">
        {location.pathname.split('/')[location.pathname.split('/').length - 1]}
      </h2>
      {selectedItems && onDeleteItems && (
        <div className="flex c-gap-10">
          <Button
            disabled={!selectedItems.length}
            type="button"
            value="Delete"
            onClick={onDeleteItems}
          />
          <Button type="button" value="New" onClick={() => navigate('new')} />
        </div>
      )}
    </div>
  );
};

export default Title;
