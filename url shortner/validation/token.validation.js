import {z} from 'zod';
import { id } from 'zod/locales';
export const usertokenSchema = z.object({
    id : z.string()
});