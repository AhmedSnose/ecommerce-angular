import { CartGroupType } from 'src/app/components/shared/Models/groupType';
import { cartItem } from '../../components/shared/Models/cartType';


export interface CartStateInterface {
  isLoading: boolean;
  error: string | null;
  groups:CartGroupType[]
}
