
import { AiOutlineUserDelete } from "react-icons/ai";
import { Control, useFieldArray } from 'react-hook-form';
import { FormValues, IFormUtils } from 'common/interface';
import { useEffect } from "react";

interface ICompanyOwnerDetails extends IFormUtils {
  control: Control<FormValues, any>
}

const CompanyOwnerDetails = ({ control, errors, register }: ICompanyOwnerDetails) => {
  useEffect(() => addOwner(), [])


  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "owners",
  });


  const addOwner = () => {
    prepend({
      firstName: "",
      lastName: "",
    })
  }


  const removeOwner = (index: number) => remove(index)



  return (
    <div>
      <h3>פרטי בעל\י החברה</h3>
      <div className="white-container">
        <table>
          <tr>
            <th>שם משפחה</th>
            <th>שם פרטי</th>
          </tr>
          {fields.map((field, index) => (
            <tr key={field.id}>
              <td>
                <input style={{ width: '100%' }} autoComplete="new-password" {...register(`owners.${index}.firstName`)} />
                <p className="error">{errors?.owners && errors?.owners[index]?.firstName?.message}</p>
              </td>
              <td>
                <input style={{ width: '100%' }} autoComplete="new-password" {...register(`owners.${index}.lastName`)} />
                <p className="error">{errors?.owners && errors?.owners[index]?.lastName?.message}</p>
              </td>
              <td className="remove-owner-td"><AiOutlineUserDelete onClick={() => removeOwner(index)} className='remove-owner-icon' /></td>
            </tr>
          ))}
        </table>
        <button type="button" className="add-product" onClick={() => addOwner()}>הוסף בעלים</button>
      </div>
    </div>
  )
}

export default CompanyOwnerDetails