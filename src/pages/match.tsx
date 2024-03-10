import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import StressStatsDisplay from './stressStatsDisplay';
