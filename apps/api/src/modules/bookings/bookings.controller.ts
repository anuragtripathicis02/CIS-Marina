import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { TransitionStatusDto } from './dto/transition-status.dto';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { BookingStatus, IApiResponse } from '@yacht-platform/types';

@ApiTags('Booking Engine State Machine')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new booking reservation with double-booking check' })
  async createBooking(
    @CurrentTenant() orgId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: CreateBookingDto,
  ): Promise<IApiResponse> {
    const booking = await this.bookingsService.createBooking(orgId, dto, userId);
    return {
      success: true,
      data: booking,
      meta: { timestamp: new Date().toISOString(), correlationId: `booking-${booking.id}` },
    };
  }

  @Get()
  @ApiOperation({ summary: 'List bookings with optional status filter' })
  @ApiQuery({ name: 'status', enum: BookingStatus, required: false })
  async getBookings(
    @CurrentTenant() orgId?: string,
    @Query('status') status?: BookingStatus,
  ): Promise<IApiResponse> {
    const bookings = await this.bookingsService.getBookings(orgId, status);
    return {
      success: true,
      data: bookings,
      meta: { timestamp: new Date().toISOString(), correlationId: `req-${Date.now()}`, totalItems: bookings.length },
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get detailed booking record' })
  async getBookingById(@Param('id') id: string): Promise<IApiResponse> {
    const booking = await this.bookingsService.getBookingById(id);
    return {
      success: true,
      data: booking,
      meta: { timestamp: new Date().toISOString(), correlationId: `booking-${id}` },
    };
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Transition booking status (State Machine Guard)' })
  async transitionStatus(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body() dto: TransitionStatusDto,
  ): Promise<IApiResponse> {
    const booking = await this.bookingsService.transitionStatus(id, dto, userId);
    return {
      success: true,
      data: booking,
      meta: { timestamp: new Date().toISOString(), correlationId: `booking-${id}` },
    };
  }
}
