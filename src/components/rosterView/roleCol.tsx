import { Character, useAppDispatch } from '../../state';
import { useRef } from 'react';
import { setRoleSpec } from '../../state/reducers/rosterSlice';
import { classRoleSpec } from '../../state';

const RoleCol: React.FC<{ character: Character }> = ({ character }) => {
    const { _id, _role, _class } = character;

    const dispatch = useAppDispatch();

    const selectDropdown = useRef<HTMLSelectElement>(null);

    const handleSelect = () => {
        const dropDown = selectDropdown.current;
        if (!dropDown) return;
        const dropDownValue = dropDown.value.split(',');
        dispatch(
            setRoleSpec({
                _id: _id,
                _role: dropDownValue[0],
                _mainSpec: dropDownValue[1],
            })
        );
    };

    const roleSpec: any[] = [];

    const options = Object.entries(classRoleSpec).forEach(([key, roles]) => {
        if (!_class || _class.replace(' ', '').toLowerCase() !== key) {
        } else {
            Object.entries(roles).map(([role, specs]) => {
                if (Array.isArray(specs)) {
                    specs.forEach((spec) => {
                        roleSpec.push(
                            <option
                                key={[role, spec].join('').replace(' ', '')}
                                value={[role, spec]}
                            >
                                {`${role}: ${spec}`}
                            </option>
                        );
                    });
                } else {
                    roleSpec.push(
                        <option
                            key={[role, specs].join('').replace(' ', '')}
                            value={[role, specs]}
                        >
                            {`${role}: ${specs}`}
                        </option>
                    );
                }
            });
        }
    });

    return (
        <td>
            {_role ? (
                _role
            ) : (
                <select
                    value={'default'}
                    ref={selectDropdown}
                    onChange={handleSelect}
                >
                    <option disabled value='default'>
                        Set Role
                    </option>
                    {roleSpec}
                </select>
            )}
        </td>
    );
};

export default RoleCol;
