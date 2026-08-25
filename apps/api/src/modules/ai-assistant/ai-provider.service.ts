import { Injectable } from '@nestjs/common';
import { IAiPromptRequest, IAiPromptResponse } from '@yacht-platform/types';

@Injectable()
export class AiProviderService {
  /**
   * AIProvider Abstraction Layer (Requirement 36)
   */
  async generateText(request: IAiPromptRequest): Promise<IAiPromptResponse> {
    const feature = request.feature || 'GENERAL';
    let resultText = '';
    let recommendationReason = '';

    if (feature === 'CHAT_ASSISTANT') {
      const pLower = request.prompt.toLowerCase();
      if (pLower.includes('lead') || pLower.includes('contact')) {
        resultText = 'You currently have 14 active leads. 5 are in QUALIFIED status, 2 require urgent follow-up today (Harrison Sterling and Sophia Laurent).';
      } else if (pLower.includes('revenue') || pLower.includes('financial')) {
        resultText = 'Total Month-to-Date Revenue across Charter, Marina, and Yacht Club is €48,500 (+18% vs last month). Outstanding payments: €4,250.';
      } else if (pLower.includes('available') || pLower.includes('yacht')) {
        resultText = 'Ocean Pearl 115 (120ft) is available starting Sept 15th. Azure Horizon 88 (78ft) is docked at Monaco Port Hercules Berth A-03.';
      } else {
        resultText = 'Based on your authorized database query, all 3 fleet vessels are operational, 2 berths are reserved, and 1 maintenance task is scheduled for tomorrow.';
      }
    } else if (feature === 'CUSTOMER_RESPONSE_DRAFT') {
      resultText = `Dear ${request.context?.customerName || 'Valued Guest'},\n\nThank you for inquiring about our luxury charter experience aboard ${request.context?.yachtName || 'Ocean Pearl 115'}. We are pleased to confirm that ${request.context?.dates || 'your requested dates'} are available.\n\nOur captain and concierge team look forward to hosting you.\n\nWarm regards,\nNauticos Charter Operations`;
      recommendationReason = 'Generated draft using customer preferences and vessel availability.';
    } else if (feature === 'MARKETING_COPY') {
      resultText = `🌟 Experience Unmatched Luxury on the French Riviera 🌟\n\nStep aboard ${request.context?.yachtName || 'Ocean Pearl 115'} for an unforgettable charter along Monaco, Saint-Tropez, and Cap-Ferrat. Enjoy 5-star concierge service, private chef dining, and seamless berth access.\n\nBook your private voyage today! #YachtCharter #Monaco #LuxuryTravel`;
    } else if (feature === 'PRICING_RECOMMENDATION') {
      resultText = 'Recommended weekend rate increase: +15% (€650 -> €747 / night).';
      recommendationReason = 'High demand detected during Monaco Grand Prix week. Historical berth occupancy rate is 92%.';
    } else {
      resultText = 'AI Assistant generated structured response based on platform metrics.';
    }

    return {
      resultText,
      recommendationReason,
      tokensUsed: Math.floor(120 + Math.random() * 250),
    };
  }
}
