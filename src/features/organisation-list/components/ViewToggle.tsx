import { EViewOption } from '..';
import { Text } from "@chakra-ui/react";
import { ReactComponent as ViewCardActive } from '../../../assets/icons/viewCardActive.svg'
import { ReactComponent as ViewCardInactive } from '../../../assets/icons/viewCardInactive.svg'
import { ReactComponent as ViewListActive } from '../../../assets/icons/viewListActive.svg'
import { ReactComponent as ViewListInactive } from '../../../assets/icons/viewListInactive.svg'

interface IViewToggle {
    onChange: (option: EViewOption) => void;
    viewOption: EViewOption;
}

const ViewToggle: React.FC<IViewToggle> = ({onChange, viewOption}) => {
    return (
        <div style={{alignSelf: 'end', display: 'flex', flexDirection: 'row'}}>
          <div onClick={() => onChange(EViewOption.Card)} style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginRight: 5}}>
            {viewOption === EViewOption.Card ? <ViewCardActive/> : <ViewCardInactive/>}
            <Text
              marginLeft={2}
              style={viewOption === EViewOption.Card ? {
                color: "#3959FF",
                fontWeight: 'bold',
              }
              : {
                color: "#CBCBCB",
              }}
            >
              Card View
            </Text>
          </div>
          <div style={{color: '#CBCBCB'}}>
            l
          </div>
          <div onClick={() => onChange(EViewOption.List)} style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginLeft: 5}}>
            {viewOption === EViewOption.List ? <ViewListActive/> : <ViewListInactive/>}
            <Text
              marginLeft={2}
              style={viewOption === EViewOption.List ? {
                color: "#3959FF",
                fontWeight: 'bold',
              }
              : {
                color: "#CBCBCB",
              }}
            >
              List View
            </Text>
          </div>
        </div>
    )
}

export default ViewToggle;